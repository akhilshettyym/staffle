import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findById: jest.fn(),
        findOne: jest.fn(),
    },
}));

const { deactivateEmployeeController } = await import("../../../src/controllers/AdminControllers/deactivateEmployee.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("deactivateEmployeeController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {
            params: {
                empId: "emp123",
            },
            user: {
                role: "ADMIN",
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

    test("should fail if user is not ADMIN or SUPER_ADMIN", async () => {
        req.user.role = "EMPLOYEE";

        await deactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should fail if employee not found for ADMIN", async () => {
        userModel.findOne.mockResolvedValue(null);

        await deactivateEmployeeController(req, res);

        expect(userModel.findOne).toHaveBeenCalledWith({
            _id: "emp123",
            organizationId: "org123",
        });

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if employee not found for SUPER_ADMIN", async () => {
        req.user.role = "SUPER_ADMIN";

        userModel.findById.mockResolvedValue(null);

        await deactivateEmployeeController(req, res);

        expect(userModel.findById).toHaveBeenCalledWith("emp123");
        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if trying to deactivate ADMIN as ADMIN", async () => {
        userModel.findOne.mockResolvedValue({
            _id: "emp123",
            role: "ADMIN",
            employmentStatus: "ACTIVE",
        });

        await deactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if employee already inactive", async () => {
        userModel.findOne.mockResolvedValue({
            _id: "emp123",
            role: "EMPLOYEE",
            employmentStatus: "IN-ACTIVE",
        });

        await deactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should deactivate employee successfully as ADMIN", async () => {
        const mockSave = jest.fn();

        const employee = {
            _id: "emp123",
            role: "EMPLOYEE",
            employmentStatus: "ACTIVE",
            save: mockSave,
        };

        userModel.findOne.mockResolvedValue(employee);

        await deactivateEmployeeController(req, res);

        expect(employee.employmentStatus).toBe("IN-ACTIVE");
        expect(employee.employmentStatusChangedAt).toBeDefined();
        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should deactivate employee successfully as SUPER_ADMIN", async () => {
        req.user.role = "SUPER_ADMIN";

        const mockSave = jest.fn();

        const employee = {
            _id: "emp123",
            role: "ADMIN",
            employmentStatus: "ACTIVE",
            save: mockSave,
        };

        userModel.findById.mockResolvedValue(employee);

        await deactivateEmployeeController(req, res);

        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        userModel.findOne.mockRejectedValue(new Error("DB error"));

        await deactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
                message: "Error removing employee",
            })
        );
    });
});