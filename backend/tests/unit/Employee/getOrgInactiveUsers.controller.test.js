import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        find: jest.fn(),
    },
}));

const { getOrganizationInactiveUsers } = await import("../../../src/controllers/EmployeeControllers/getOrgInactiveUsers.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("getOrganizationInactiveUsers - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            user: {
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

    test("should fetch inactive users successfully", async () => {
        const mockUsers = [{ _id: "1" }, { _id: "2" }];

        const mockQuery = {
            select: jest.fn().mockReturnThis(),
            sort: jest.fn().mockResolvedValue(mockUsers),
        };

        userModel.find.mockReturnValue(mockQuery);

        await getOrganizationInactiveUsers(req, res);

        expect(userModel.find).toHaveBeenCalledWith({
            organizationId: "org123",
            employmentStatus: "IN-ACTIVE",
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            count: 2,
            users: mockUsers,
        });
    });

    test("should handle server error", async () => {
        userModel.find.mockImplementation(() => {
            throw new Error("DB error");
        });

        await getOrganizationInactiveUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});