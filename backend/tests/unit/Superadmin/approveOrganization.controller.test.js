import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findById: jest.fn(),
    },
}));

const { approveOrganization } = await import("../../../src/controllers/SuperAdminControllers/approveOrganization.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("approveOrganization - Unit", () => {
    let req, res, mockOrg;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { orgId: "org123" },
        };

        mockOrg = {
            _id: "org123",
            status: "PENDING",
            save: jest.fn(),
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should approve organization", async () => {
        orgModel.findById.mockResolvedValue(mockOrg);

        await approveOrganization(req, res);

        expect(mockOrg.status).toBe("ACTIVE");
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should fail if org not found", async () => {
        orgModel.findById.mockResolvedValue(null);

        await approveOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if not pending", async () => {
        mockOrg.status = "ACTIVE";
        orgModel.findById.mockResolvedValue(mockOrg);

        await approveOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });
});