import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../src/models/user.model.js", () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndDelete: jest.fn(),
        find: jest.fn(),
    },
}));

jest.unstable_mockModule("../../src/models/org.model.js", () => ({
    default: {
        findById: jest.fn(),
        findOne: jest.fn(),
        find: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
}));

jest.unstable_mockModule("../../src/models/task.model.js", () => ({
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
    },
}));

const { default: userModel } = await import("../../src/models/user.model.js");
const { default: orgModel } = await import("../../src/models/org.model.js");
const { default: taskModel } = await import("../../src/models/task.model.js");

const { addAdminController } = await import("../../src/controllers/SuperAdminControllers/addAdmin.controller.js");
const { approveOrganization } = await import("../../src/controllers/SuperAdminControllers/approveOrganization.controller.js");
const { createNewTaskController } = await import("../../src/controllers/SuperAdminControllers/createNewTask.controller.js");
const { deleteAdminEmployeeController } = await import("../../src/controllers/SuperAdminControllers/deleteAdminEmployee.controller.js");
const { deleteOrganizationController } = await import("../../src/controllers/SuperAdminControllers/deleteOrganization.controller.js");
const { getAllEmployeesDetails } = await import("../../src/controllers/SuperAdminControllers/getAllEmployees.controller.js");
const { getAllOrganizationDetails } = await import("../../src/controllers/SuperAdminControllers/getAllOrganization.controller.js");
const { getAllTasksDetails } = await import("../../src/controllers/SuperAdminControllers/getAllTasks.controller.js");
const { getSpecificOrganizationDetails } = await import("../../src/controllers/SuperAdminControllers/getSpecificOrganization.controller.js");
const { getOrgSpecificEmployeeDetails } = await import("../../src/controllers/SuperAdminControllers/getSpecificOrgEmployees.controller.js");
const { getOrgSpecificTasksDetails } = await import("../../src/controllers/SuperAdminControllers/getSpecificOrgTasks.controller.js");
const { reactivateOrganization } = await import("../../src/controllers/SuperAdminControllers/reactivateOrganization.controller.js");
const { rejectOrganization } = await import("../../src/controllers/SuperAdminControllers/rejectOrganization.controller.js");
const { revokeOrganization } = await import("../../src/controllers/SuperAdminControllers/revokeOrganization.controller.js");
const { updateNewTaskController } = await import("../../src/controllers/SuperAdminControllers/updateNewTask.controller.js");


describe("SuperAdmin Combined Test Suite", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("addAdmin - success", async () => {
        req.body = {
            firstName: "John",
            lastName: "Doe",
            email: "john@test.com",
            password: "password123",
            dateOfBirth: "1995-01-01",
            designation: "Manager",
            organizationId: "org123",
        };

        userModel.findOne.mockResolvedValue(null);
        orgModel.findById.mockResolvedValue({ _id: "org123" });
        userModel.create.mockResolvedValue({ _id: "admin123" });

        await addAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
    });


    test("approveOrganization - success", async () => {
        const mockOrg = { status: "PENDING", save: jest.fn() };

        req.params = { orgId: "org123" };
        orgModel.findById.mockResolvedValue(mockOrg);

        await approveOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("createTask - success", async () => {
        req.params = { orgId: "org123" };
        req.body = { title: "Task", assignedTo: "emp123" };

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


    test("deleteEmployee - success", async () => {
        req.params = { empId: "emp123" };

        userModel.findById.mockResolvedValue({
            role: "EMPLOYEE",
            employmentStatus: "IN-ACTIVE",
        });

        await deleteAdminEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("deleteOrg - success", async () => {
        req.params = { orgId: "org123" };

        orgModel.findOne.mockResolvedValue({ status: "REJECTED" });
        orgModel.findByIdAndDelete.mockResolvedValue({});

        await deleteOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("getAllEmployees - success", async () => {
        userModel.find.mockReturnValue({
            select: jest.fn().mockResolvedValue([]),
        });

        await getAllEmployeesDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("getAllOrgs - success", async () => {
        orgModel.find.mockReturnValue({
            select: jest.fn().mockResolvedValue([]),
        });

        await getAllOrganizationDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("getAllTasks - success", async () => {
        taskModel.find.mockReturnValue({
            select: jest.fn().mockResolvedValue([]),
        });

        await getAllTasksDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("reactivateOrg - success", async () => {
        req.params = { orgId: "org123" };

        orgModel.findById.mockResolvedValue({
            status: "REVOKED",
            save: jest.fn(),
        });

        await reactivateOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("rejectOrg - success", async () => {
        req.params = { orgId: "org123" };

        const mockOrg = { status: "PENDING", save: jest.fn() };
        orgModel.findById.mockResolvedValue(mockOrg);

        await rejectOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("revokeOrg - success", async () => {
        req.params = { orgId: "org123" };

        const mockOrg = { status: "ACTIVE", save: jest.fn() };
        orgModel.findById.mockResolvedValue(mockOrg);

        await revokeOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });


    test("updateTask - success", async () => {
        req.params = { orgId: "org123", taskId: "task123" };

        orgModel.findById.mockResolvedValue({ status: "ACTIVE" });
        taskModel.findOne.mockResolvedValue({
            status: "NEW",
            save: jest.fn(),
            organizationId: "org123",
        });

        await updateNewTaskController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});