import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findById: jest.fn(),
    },
}));

const { getOrganizationDetails } = await import("../../../src/controllers/OrganizationControllers/getOrganizationDetails.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("getOrganizationDetails - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {
            user: {
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

    test("should fail if organizationId missing", async () => {
        req.user.organizationId = null;

        await getOrganizationDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if organization not found", async () => {
        const mockQuery = {
            select: jest.fn().mockResolvedValue(null),
        };

        orgModel.findById.mockReturnValue(mockQuery);

        await getOrganizationDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should return organization details", async () => {
        const mockOrg = { _id: "org123", orgName: "Test Org" };

        const mockQuery = {
            select: jest.fn().mockResolvedValue(mockOrg),
        };

        orgModel.findById.mockReturnValue(mockQuery);

        await getOrganizationDetails(req, res);

        expect(orgModel.findById).toHaveBeenCalledWith("org123");

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            organization: mockOrg,
        });
    });

    test("should handle server error", async () => {
        orgModel.findById.mockImplementation(() => {
            throw new Error("DB error");
        });

        await getOrganizationDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});