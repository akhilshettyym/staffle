import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findById: jest.fn(),
    },
}));

const { addAdminController } = await import("../../../src/controllers/SuperAdminControllers/addAdmin.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("addAdminController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {
                firstName: "John",
                lastName: "Doe",
                email: "john@test.com",
                password: "password123",
                dateOfBirth: "1995-01-01",
                designation: "Manager",
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

    test("should create admin successfully", async () => {
        userModel.findOne.mockResolvedValue(null);
        orgModel.findById.mockResolvedValue({ _id: "org123" });
        userModel.create.mockResolvedValue({ _id: "admin123" });

        await addAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
    });

    test("should fail if missing fields", async () => {
        req.body.email = undefined;

        await addAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if email exists", async () => {
        userModel.findOne.mockResolvedValue({ _id: "existing" });

        await addAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
    });

    test("should fail if org not found", async () => {
        userModel.findOne.mockResolvedValue(null);
        orgModel.findById.mockResolvedValue(null);

        await addAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });
});