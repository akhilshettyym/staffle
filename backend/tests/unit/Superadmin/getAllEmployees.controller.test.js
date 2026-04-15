import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        find: jest.fn(),
    },
}));

const { getAllEmployeesDetails } = await import("../../../src/controllers/SuperAdminControllers/getAllEmployees.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("getAllEmployeesDetails - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should return employees", async () => {
        const mockQuery = {
            select: jest.fn().mockResolvedValue([{ name: "emp1" }]),
        };

        userModel.find.mockReturnValue(mockQuery);

        await getAllEmployeesDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle error", async () => {
        userModel.find.mockImplementation(() => {
            throw new Error("DB error");
        });

        await getAllEmployeesDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});