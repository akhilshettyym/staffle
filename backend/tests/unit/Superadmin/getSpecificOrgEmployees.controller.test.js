import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: { find: jest.fn() },
}));

const { getOrgSpecificEmployeeDetails } = await import("../../../src/controllers/SuperAdminControllers/getSpecificOrgEmployees.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("getOrgSpecificEmployeeDetails - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = { params: { orgId: "org123" } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    afterEach(() => jest.restoreAllMocks());

    test("should return employees", async () => {
        const mockQuery = {
            select: jest.fn().mockResolvedValue([]),
        };

        userModel.find.mockReturnValue(mockQuery);

        await getOrgSpecificEmployeeDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});