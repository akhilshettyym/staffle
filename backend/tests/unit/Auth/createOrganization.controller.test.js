import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("jsonwebtoken", () => ({
    default: {
        sign: jest.fn(() => "mocked_token"),
    },
}));

jest.unstable_mockModule("mongoose", () => ({
    default: {
        startSession: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

const mongoose = (await import("mongoose")).default;
const jwt = (await import("jsonwebtoken")).default;
const { createOrganizationController } = await import("../../../src/controllers/AuthControllers/createOrganization.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("createOrganizationController - Unit", () => {
    let req, res, session;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => { });

        session = {
            startTransaction: jest.fn(),
            commitTransaction: jest.fn(),
            abortTransaction: jest.fn(),
            endSession: jest.fn(),
        };

        mongoose.startSession.mockResolvedValue(session);

        req = {
            body: {
                firstName: "John",
                lastName: "Doe",
                email: "john@test.com",
                password: "password123",
                confirmPassword: "password123",
                dateOfBirth: "1995-01-01",
                designation: "CEO",
                orgName: "Test Org",
                orgDomain: "test.com",
                orgDescription: "Test description",
                orgCountry: "IN",
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should fail if required fields missing", async () => {
        req.body = {};

        await createOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if passwords mismatch", async () => {
        req.body.confirmPassword = "wrong";

        await createOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if user exists", async () => {
        userModel.findOne.mockResolvedValue({ _id: "user" });

        await createOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
    });

    test("should fail if org domain exists", async () => {
        userModel.findOne.mockResolvedValue(null);
        orgModel.findOne.mockResolvedValue({ _id: "org" });

        await createOrganizationController(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
    });

    test("should create organization successfully", async () => {
        userModel.findOne.mockResolvedValue(null);
        orgModel.findOne.mockResolvedValue(null);

        const mockOrg = { _id: "org123", save: jest.fn() };
        const mockUser = { _id: "user123", role: "ADMIN", organizationId: "org123" };

        orgModel.create.mockResolvedValue([mockOrg]);
        userModel.create.mockResolvedValue([mockUser]);

        await createOrganizationController(req, res);

        expect(session.startTransaction).toHaveBeenCalled();
        expect(session.commitTransaction).toHaveBeenCalled();

        expect(jwt.sign).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(201);
    });

    test("should handle server error", async () => {
        userModel.findOne.mockRejectedValue(new Error("DB error"));

        await createOrganizationController(req, res);

        expect(session.abortTransaction).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
    });
});