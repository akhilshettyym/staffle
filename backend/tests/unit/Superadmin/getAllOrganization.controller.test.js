import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        find: jest.fn(),
    },
}));

const { getAllOrganizationDetails } = await import("../../../src/controllers/SuperAdminControllers/getAllOrganization.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("getAllOrganizationDetails - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => jest.restoreAllMocks());

    test("should return organizations", async () => {
        const mockQuery = {
            select: jest.fn().mockResolvedValue([{ org: "org1" }]),
        };

        orgModel.find.mockReturnValue(mockQuery);

        await getAllOrganizationDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should return 404 if null", async () => {
        const mockQuery = {
            select: jest.fn().mockResolvedValue(null),
        };

        orgModel.find.mockReturnValue(mockQuery);

        await getAllOrganizationDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});