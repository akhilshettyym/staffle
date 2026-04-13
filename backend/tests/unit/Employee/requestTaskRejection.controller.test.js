import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: {
        findOne: jest.fn(),
    },
}));

const { requestTaskRejectionController } = await import("../../../src/controllers/EmployeeControllers/requestTaskRejection.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("requestTaskRejectionController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { taskId: "task123" },
            body: {
                reason: "This is a valid rejection reason",
            },
            user: {
                _id: "emp123",
                organizationId: "org123",
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should fail if reason invalid", async () => {
        req.body.reason = "short";

        await requestTaskRejectionController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if task not found", async () => {
        taskModel.findOne.mockResolvedValue(null);

        await requestTaskRejectionController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if not assigned user", async () => {
        taskModel.findOne.mockResolvedValue({
            assignedTo: { toString: () => "otherUser" },
            status: "NEW",
        });

        await requestTaskRejectionController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should fail if task not NEW", async () => {
        taskModel.findOne.mockResolvedValue({
            assignedTo: { toString: () => "emp123" },
            status: "IN_PROGRESS",
        });

        await requestTaskRejectionController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should request rejection successfully", async () => {
        const mockSave = jest.fn();

        const task = {
            assignedTo: { toString: () => "emp123" },
            status: "NEW",
            save: mockSave,
        };

        taskModel.findOne.mockResolvedValue(task);

        await requestTaskRejectionController(req, res);

        expect(task.status).toBe("REJECTION_REQUESTED");
        expect(task.rejection.reason).toBe(req.body.reason);
        expect(task.rejection.status).toBe("PENDING");

        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        taskModel.findOne.mockRejectedValue(new Error("DB error"));

        await requestTaskRejectionController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});