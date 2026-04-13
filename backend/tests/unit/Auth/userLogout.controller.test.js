import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";
import { userLogoutController } from "../../../src/controllers/AuthControllers/userLogout.controller.js";

describe("userLogoutController - Unit", () => {
    let req, res;

    beforeEach(() => {
        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            clearCookie: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should logout successfully", async () => {
        await userLogoutController(req, res);

        expect(res.clearCookie).toHaveBeenCalledWith("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Logged out successfully",
        });
    });

    test("should handle server error", async () => {
        res.clearCookie.mockImplementation(() => {
            throw new Error("Logout error");
        });

        await userLogoutController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Server error during logout",
            error: "Logout error",
        });
    });
});