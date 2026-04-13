import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: {
        findOneAndDelete: jest.fn(),
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

const { deleteTaskController } = await import("../../../src/controllers/AdminControllers/deleteTask.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

const mongoose = (await import("mongoose")).default;

describe("deleteTaskController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {
            params: { taskId: "task123" },
            user: { organizationId: "org123" },
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

        await deleteTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if task not found", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOneAndDelete.mockResolvedValue(null);

        await deleteTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should delete task successfully", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOneAndDelete.mockResolvedValue({ _id: "task123" });

        await deleteTaskController(req, res);

        expect(taskModel.findOneAndDelete).toHaveBeenCalledWith({
            _id: "task123",
            organizationId: "org123",
        });

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        mongoose.Types.ObjectId.isValid.mockReturnValue(true);

        taskModel.findOneAndDelete.mockRejectedValue(new Error("DB error"));

        await deleteTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});