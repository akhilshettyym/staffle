import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findById: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
}));

const { deleteAdminEmployeeController } = await import("../../../src/controllers/SuperAdminControllers/deleteAdminEmployee.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("deleteAdminEmployeeController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = { params: { empId: "emp123" } };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should delete user", async () => {
        userModel.findById.mockResolvedValue({
            role: "EMPLOYEE",
            employmentStatus: "IN-ACTIVE",
        });

        await deleteAdminEmployeeController(req, res);

        expect(userModel.findByIdAndDelete).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should fail if active user", async () => {
        userModel.findById.mockResolvedValue({
            role: "EMPLOYEE",
            employmentStatus: "ACTIVE",
        });

        await deleteAdminEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });
});