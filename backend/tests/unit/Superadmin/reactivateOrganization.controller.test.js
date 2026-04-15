import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: { findById: jest.fn() },
}));

const { reactivateOrganization } = await import("../../../src/controllers/SuperAdminControllers/reactivateOrganization.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("reactivateOrganization - Unit", () => {
    let req, res, mockOrg;

    beforeEach(() => {
        jest.clearAllMocks();

        req = { params: { orgId: "org123" } };

        mockOrg = { status: "REVOKED", save: jest.fn() };

        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    test("should reactivate", async () => {
        orgModel.findById.mockResolvedValue(mockOrg);

        await reactivateOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});