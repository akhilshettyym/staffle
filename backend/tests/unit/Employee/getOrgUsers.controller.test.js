import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
  default: {
    find: jest.fn(),
  },
}));

const { getOrganizationUsers } = await import("../../../src/controllers/EmployeeControllers/getOrgUsers.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("getOrganizationUsers - Unit", () => {
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

  test("should fetch active users successfully", async () => {
    const mockUsers = [{ _id: "1" }, { _id: "2" }];

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockResolvedValue(mockUsers),
    };

    userModel.find.mockReturnValue(mockQuery);

    await getOrganizationUsers(req, res);

    expect(userModel.find).toHaveBeenCalledWith({
      organizationId: "org123",
      employmentStatus: "ACTIVE",
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

    await getOrganizationUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});