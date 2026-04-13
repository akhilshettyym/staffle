import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: {
        findOne: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findById: jest.fn(),
    },
}));

jest.unstable_mockModule("mongoose", () => ({
    default: {
        Types: {
            ObjectId: {
                isValid: jest.fn(),
            },
        },
    },
}));

const { updateTaskController } = await import("../../../src/controllers/AdminControllers/updateTask.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

const mongoose = (await import("mongoose")).default;

describe("updateTaskController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {
            params: { taskId: "task123" },
            body: {},
            user: {
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

    test("should fail if invalid taskId", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(false);

        await updateTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if task not found", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOne.mockResolvedValue(null);

        await updateTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if invalid status", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOne.mockResolvedValue({
            status: "COMPLETED",
            organizationId: "org123",
        });

        await updateTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if assigned user not found", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOne.mockResolvedValue({
            status: "NEW",
            organizationId: "org123",
        });

        req.body.assignedTo = "emp123";

        userModel.findById.mockResolvedValue(null);

        await updateTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if assigned user from another org", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOne.mockResolvedValue({
            status: "NEW",
            organizationId: "org123",
        });

        req.body.assignedTo = "emp123";

        userModel.findById.mockResolvedValue({
            organizationId: "org999",
        });

        await updateTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail invalid due date", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOne.mockResolvedValue({
            status: "NEW",
            organizationId: "org123",
        });

        req.body.dueDate = "invalid";

        await updateTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should update task successfully", async () => {
        const mockSave = jest.fn();

        const task = {
            status: "NEW",
            organizationId: "org123",
            save: mockSave,
        };

        mongoose.Types.ObjectId.isValid.mockReturnValue(true);
        taskModel.findOne.mockResolvedValue(task);

        req.body.title = "Updated Task";

        await updateTaskController(req, res);

        expect(task.title).toBe("Updated Task");
        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should reset FAILED task to NEW", async () => {
        const mockSave = jest.fn();

        const task = {
            status: "FAILED",
            organizationId: "org123",
            taskLifeCycle: {
                failure: {},
            },
            save: mockSave,
        };

        mongoose.Types.ObjectId.isValid.mockReturnValue(true);
        taskModel.findOne.mockResolvedValue(task);

        await updateTaskController(req, res);

        expect(task.status).toBe("NEW");
        expect(mockSave).toHaveBeenCalled();
    });

    test("should handle server error", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOne.mockRejectedValue(new Error("DB error"));

        await updateTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});