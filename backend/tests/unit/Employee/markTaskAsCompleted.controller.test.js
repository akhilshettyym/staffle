import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: {
        findOne: jest.fn(),
    },
}));

const { markTaskAsCompletedController } = await import("../../../src/controllers/EmployeeControllers/markTaskAsCompleted.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("markTaskAsCompletedController - Unit", () => {
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

        await markTaskAsCompletedController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if not assigned user", async () => {
        taskModel.findOne.mockResolvedValue({
            assignedTo: { toString: () => "otherUser" },
            status: "IN_PROGRESS",
        });

        await markTaskAsCompletedController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should fail if task not IN_PROGRESS", async () => {
        taskModel.findOne.mockResolvedValue({
            assignedTo: { toString: () => "emp123" },
            status: "NEW",
        });

        await markTaskAsCompletedController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should mark task as completed", async () => {
        const mockSave = jest.fn();

        const task = {
            assignedTo: { toString: () => "emp123" },
            status: "IN_PROGRESS",
            save: mockSave,
        };

        taskModel.findOne.mockResolvedValue(task);

        await markTaskAsCompletedController(req, res);

        expect(task.status).toBe("COMPLETED");
        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        taskModel.findOne.mockRejectedValue(new Error("DB error"));

        await markTaskAsCompletedController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});