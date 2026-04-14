import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findById: jest.fn(),
        findOne: jest.fn(),
    },
}));

const { updateOrganizationController } = await import("../../../src/controllers/OrganizationControllers/updateOrganization.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("updateOrganizationController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { orgId: "org123" },
            body: {
                orgName: "New Org",
            },
            user: {
                _id: "admin123",
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

    test("should fail if not admin", async () => {
        req.user.role = "EMPLOYEE";

        await updateOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should fail if organization not found", async () => {
        orgModel.findById.mockResolvedValue(null);

        await updateOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if org not ACTIVE", async () => {
        orgModel.findById.mockResolvedValue({
            status: "PENDING",
        });

        await updateOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if no fields provided", async () => {
        req.body = {};

        orgModel.findById.mockResolvedValue({
            status: "ACTIVE",
        });

        await updateOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if domain already exists", async () => {
        req.body = { orgDomain: "test.com" };

        orgModel.findById.mockResolvedValue({
            orgDomain: "old.com",
            status: "ACTIVE",
        });

        orgModel.findOne.mockResolvedValue({ _id: "existingOrg" });

        await updateOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
    });

    test("should update organization successfully", async () => {
        const mockSave = jest.fn();

        const org = {
            orgName: "Old",
            orgDomain: "old.com",
            orgCountry: "IN",
            orgDescription: "Old desc",
            status: "ACTIVE",
            save: mockSave,
        };

        orgModel.findById.mockResolvedValue(org);

        req.body = {
            orgName: "Updated Org",
            orgCountry: "US",
        };

        await updateOrganizationController(req, res);

        expect(org.orgName).toBe("Updated Org");
        expect(org.orgCountry).toBe("US");

        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should allow SUPER_ADMIN to update any org", async () => {
        const mockSave = jest.fn();

        req.user.role = "SUPER_ADMIN";

        const org = {
            orgDomain: "old.com",
            status: "ACTIVE",
            save: mockSave,
        };

        orgModel.findById.mockResolvedValue(org);

        req.body = { orgDomain: "new.com" };

        orgModel.findOne.mockResolvedValue(null);

        await updateOrganizationController(req, res);

        expect(org.orgDomain).toBe("new.com");
        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        orgModel.findById.mockRejectedValue(new Error("DB error"));

        await updateOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});