import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: {
        findOne: jest.fn(),
    },
}));

const { acceptTaskController } = await import("../../../src/controllers/EmployeeControllers/acceptTask.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("acceptTaskController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { taskId: "task123" },
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

    test("should fail if task not found", async () => {
        taskModel.findOne.mockResolvedValue(null);

        await acceptTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if not assigned to user", async () => {
        taskModel.findOne.mockResolvedValue({
            assignedTo: { toString: () => "otherUser" },
            status: "NEW",
        });

        await acceptTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should fail if task not NEW", async () => {
        taskModel.findOne.mockResolvedValue({
            assignedTo: { toString: () => "emp123" },
            status: "IN_PROGRESS",
        });

        await acceptTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should accept task successfully", async () => {
        const mockSave = jest.fn();

        const task = {
            assignedTo: { toString: () => "emp123" },
            status: "NEW",
            save: mockSave,
        };

        taskModel.findOne.mockResolvedValue(task);

        await acceptTaskController(req, res);

        expect(task.status).toBe("IN_PROGRESS");
        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        taskModel.findOne.mockRejectedValue(new Error("DB error"));

        await acceptTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});