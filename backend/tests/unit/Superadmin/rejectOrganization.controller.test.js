import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findById: jest.fn(),
    },
}));

const { rejectOrganization } = await import("../../../src/controllers/SuperAdminControllers/rejectOrganization.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("rejectOrganization - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: {
                orgId: "org123",
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should fail if organization not found", async () => {
        orgModel.findById.mockResolvedValue(null);

        await rejectOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if org is not PENDING", async () => {
        orgModel.findById.mockResolvedValue({
            _id: "org123",
            status: "ACTIVE",
        });

        await rejectOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should reject organization successfully", async () => {
        const mockOrg = {
            _id: "org123",
            status: "PENDING",
            save: jest.fn(),
        };

        orgModel.findById.mockResolvedValue(mockOrg);

        await rejectOrganization(req, res);

        expect(mockOrg.status).toBe("REJECTED");
        expect(mockOrg.save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle server error", async () => {
        orgModel.findById.mockRejectedValue(new Error("DB error"));

        await rejectOrganization(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});