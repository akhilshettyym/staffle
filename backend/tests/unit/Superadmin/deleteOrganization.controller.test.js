import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findOne: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
}));

const { deleteOrganizationController } = await import("../../../src/controllers/SuperAdminControllers/deleteOrganization.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("deleteOrganizationController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = { params: { orgId: "org123" } };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should delete organization", async () => {
        orgModel.findOne.mockResolvedValue({ status: "REJECTED" });
        orgModel.findByIdAndDelete.mockResolvedValue({ _id: "org123" });

        await deleteOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should fail if not rejected", async () => {
        orgModel.findOne.mockResolvedValue({ status: "ACTIVE" });

        await deleteOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });
});