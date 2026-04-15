import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: { findById: jest.fn() },
}));

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: { findById: jest.fn() },
}));

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: { create: jest.fn() },
}));

const { createNewTaskController } = await import("../../../src/controllers/SuperAdminControllers/createNewTask.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");
const { default: userModel } = await import("../../../src/models/user.model.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("createNewTaskController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { orgId: "org123" },
            body: {
                title: "Task",
                assignedTo: "emp123",
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

    test("should create task successfully", async () => {
        orgModel.findById.mockResolvedValue({ status: "ACTIVE" });

        userModel.findById.mockResolvedValue({
            _id: "emp123",
            organizationId: "org123",
            employmentStatus: "ACTIVE",
        });

        taskModel.create.mockResolvedValue({ _id: "task123" });

        await createNewTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
    });

    test("should fail if org missing", async () => {
        req.params.orgId = null;

        await createNewTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if user invalid", async () => {
        orgModel.findById.mockResolvedValue({ status: "ACTIVE" });
        userModel.findById.mockResolvedValue(null);

        await createNewTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});