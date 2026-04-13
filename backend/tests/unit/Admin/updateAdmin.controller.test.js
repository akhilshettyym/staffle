import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findById: jest.fn(),
        findOne: jest.fn(),
    },
}));

const { updateAdminController } = await import("../../../src/controllers/AdminControllers/updateAdmin.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("updateAdminController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {
            params: {},
            body: {},
            user: {
                _id: "admin123",
                role: "ADMIN",
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

    test("should fail if admin not found", async () => {
        userModel.findById.mockResolvedValue(null);

        await updateAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("should fail if admin inactive", async () => {
        userModel.findById.mockResolvedValue({
            employmentStatus: "IN-ACTIVE",
        });

        await updateAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if no fields provided", async () => {
        userModel.findById.mockResolvedValue({
            _id: "admin123",
            employmentStatus: "ACTIVE",
        });

        await updateAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should fail if email already exists", async () => {
        userModel.findById.mockResolvedValue({
            _id: "admin123",
            email: "old@test.com",
            employmentStatus: "ACTIVE",
        });

        req.body.email = "new@test.com";

        userModel.findOne.mockResolvedValue({ _id: "otherUser" });

        await updateAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
    });

    test("should fail for invalid DOB", async () => {
        userModel.findById.mockResolvedValue({
            _id: "admin123",
            email: "old@test.com",
            employmentStatus: "ACTIVE",
        });

        req.body.dateOfBirth = "invalid-date";

        await updateAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("should update admin successfully", async () => {
        const mockSave = jest.fn();

        const admin = {
            _id: "admin123",
            email: "old@test.com",
            employmentStatus: "ACTIVE",
            save: mockSave,
        };

        userModel.findById.mockResolvedValue(admin);

        req.body = {
            firstName: "New",
            email: "new@test.com",
        };

        userModel.findOne.mockResolvedValue(null);

        await updateAdminController(req, res);

        expect(admin.firstName).toBe("New");
        expect(admin.email).toBe("new@test.com");
        expect(mockSave).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("should handle duplicate key error", async () => {
        userModel.findById.mockResolvedValue({
            _id: "admin123",
            email: "old@test.com",
            employmentStatus: "ACTIVE",
            save: jest.fn().mockRejectedValue({
                code: 11000,
                keyPattern: { email: 1 },
            }),
        });

        req.body.email = "new@test.com";

        await updateAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
    });

    test("should handle server error", async () => {
        userModel.findById.mockRejectedValue(new Error("DB error"));

        await updateAdminController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});