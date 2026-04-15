import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: { findOne: jest.fn() },
}));

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: { findById: jest.fn() },
}));

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: { findById: jest.fn() },
}));

const { updateNewTaskController } = await import("../../../src/controllers/SuperAdminControllers/updateNewTask.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("updateNewTaskController - Unit", () => {
    let req, res, mockTask;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { orgId: "org123", taskId: "task123" },
            body: {},
        };

        mockTask = {
            status: "NEW",
            save: jest.fn(),
            organizationId: "org123",
        };

        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    test("should update task", async () => {
        orgModel.findById.mockResolvedValue({ status: "ACTIVE" });
        taskModel.findOne.mockResolvedValue(mockTask);

        await updateNewTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should fail invalid org", async () => {
        orgModel.findById.mockResolvedValue(null);

        await updateNewTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});