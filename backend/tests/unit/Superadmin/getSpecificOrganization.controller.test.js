import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: { findById: jest.fn() },
}));

const { getSpecificOrganizationDetails } = await import("../../../src/controllers/SuperAdminControllers/getSpecificOrganization.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("getSpecificOrganizationDetails - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = { params: { orgId: "org123" } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    afterEach(() => jest.restoreAllMocks());

    test("should return organization", async () => {
        const mockQuery = {
            select: jest.fn().mockResolvedValue({ _id: "org123" }),
        };

        orgModel.findById.mockReturnValue(mockQuery);

        await getSpecificOrganizationDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should return 404", async () => {
        const mockQuery = {
            select: jest.fn().mockResolvedValue(null),
        };

        orgModel.findById.mockReturnValue(mockQuery);

        await getSpecificOrganizationDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});