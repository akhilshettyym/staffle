import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("jsonwebtoken", () => ({
    default: {
        sign: jest.fn(() => "mocked_token"),
    },
}));

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findOne: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findById: jest.fn(),
    },
}));

const jwt = (await import("jsonwebtoken")).default;
const { userLoginController } = await import("../../../src/controllers/AuthControllers/userLogin.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("userLoginController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {
            body: {
                email: "test@test.com",
                password: "password123",
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

    test("should fail if missing credentials", async () => {
        req.body = {};

        await userLoginController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if user not found", async () => {
        userModel.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue(null),
        });

        await userLoginController(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    test("should fail if password invalid", async () => {
        const user = {
            comparePassword: jest.fn().mockResolvedValue(false),
        };

        userModel.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue(user),
        });

        await userLoginController(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    test("should fail if user inactive", async () => {
        const user = {
            comparePassword: jest.fn().mockResolvedValue(true),
            employmentStatus: "IN-ACTIVE",
        };

        userModel.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue(user),
        });

        await userLoginController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should login successfully (ACTIVE org)", async () => {
        const user = {
            _id: "user123",
            role: "ADMIN",
            organizationId: "org123",
            email: "test@test.com",
            comparePassword: jest.fn().mockResolvedValue(true),
            employmentStatus: "ACTIVE",
        };

        userModel.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue(user),
        });

        orgModel.findById.mockResolvedValue({
            status: "ACTIVE",
        });

        await userLoginController(req, res);

        expect(jwt.sign).toHaveBeenCalled();
        expect(res.cookie).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should fail if org is PENDING", async () => {
        const user = {
            comparePassword: jest.fn().mockResolvedValue(true),
            employmentStatus: "ACTIVE",
            role: "ADMIN",
            organizationId: "org123",
        };

        userModel.findOne.mockReturnValue({
            select: jest.fn().mockResolvedValue(user),
        });

        orgModel.findById.mockResolvedValue({
            status: "PENDING",
        });

        await userLoginController(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("should handle server error", async () => {
        userModel.findOne.mockImplementation(() => {
            throw new Error("DB error");
        });

        await userLoginController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});