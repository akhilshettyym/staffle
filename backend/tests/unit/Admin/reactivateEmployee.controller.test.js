import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findById: jest.fn(),
        findOne: jest.fn(),
    },
}));

const { reactivateEmployeeController } = await import("../../../src/controllers/AdminControllers/reactivateEmployee.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("reactivateEmployeeController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {
            params: { empId: "emp123" },
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

    test("should fail if empId missing", async () => {
        req.params.empId = "";

        await reactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if not authorized", async () => {
        req.user.role = "EMPLOYEE";

        await reactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should fail if employee not found", async () => {
        userModel.findOne.mockResolvedValue(null);

        await reactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if trying to reactivate ADMIN as ADMIN", async () => {
        userModel.findOne.mockResolvedValue({
            role: "ADMIN",
            employmentStatus: "IN-ACTIVE",
        });

        await reactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if already active", async () => {
        userModel.findOne.mockResolvedValue({
            role: "EMPLOYEE",
            employmentStatus: "ACTIVE",
        });

        await reactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should reactivate successfully (ADMIN)", async () => {
        const mockSave = jest.fn();

        const employee = {
            role: "EMPLOYEE",
            employmentStatus: "IN-ACTIVE",
            save: mockSave,
        };

        userModel.findOne.mockResolvedValue(employee);

        await reactivateEmployeeController(req, res);

        expect(employee.employmentStatus).toBe("ACTIVE");
        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should reactivate successfully (SUPER_ADMIN)", async () => {
        req.user.role = "SUPER_ADMIN";

        const mockSave = jest.fn();

        const employee = {
            role: "ADMIN",
            employmentStatus: "IN-ACTIVE",
            save: mockSave,
        };

        userModel.findById.mockResolvedValue(employee);

        await reactivateEmployeeController(req, res);

        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        userModel.findOne.mockRejectedValue(new Error("DB error"));

        await reactivateEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});