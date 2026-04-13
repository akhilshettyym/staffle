import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: {
        findOne: jest.fn(),
    },
}));

const { markTaskAsFailedController } = await import("../../../src/controllers/EmployeeControllers/markTaskAsFailed.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("markTaskAsFailedController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { taskId: "task123" },
            body: {
                reason: "This is a valid failure reason",
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

    test("should fail if reason is invalid", async () => {
        req.body.reason = "short";

        await markTaskAsFailedController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if task not found", async () => {
        taskModel.findOne.mockResolvedValue(null);

        await markTaskAsFailedController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if not assigned user", async () => {
        taskModel.findOne.mockResolvedValue({
            assignedTo: { toString: () => "otherUser" },
            status: "IN_PROGRESS",
        });

        await markTaskAsFailedController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should fail if task not IN_PROGRESS", async () => {
        taskModel.findOne.mockResolvedValue({
            assignedTo: { toString: () => "emp123" },
            status: "NEW",
        });

        await markTaskAsFailedController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should mark task as FAILED", async () => {
        const mockSave = jest.fn();

        const task = {
            assignedTo: { toString: () => "emp123" },
            status: "IN_PROGRESS",
            taskLifeCycle: {},
            save: mockSave,
        };

        taskModel.findOne.mockResolvedValue(task);

        await markTaskAsFailedController(req, res);

        expect(task.status).toBe("FAILED");
        expect(task.taskLifeCycle.failure.reason).toBe(req.body.reason);
        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        taskModel.findOne.mockRejectedValue(new Error("DB error"));

        await markTaskAsFailedController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});