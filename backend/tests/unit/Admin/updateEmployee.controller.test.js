import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
  default: {
    findOne: jest.fn(),
  },
}));

const { updateEmployeeController } = await import("../../../src/controllers/AdminControllers/updateEmployee.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");

describe("updateEmployeeController - Unit", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => { });

    req = {
      params: { employeeId: "emp123" },
      body: {},
      user: {
        role: "ADMIN",
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

  test("should fail if employee not found", async () => {
    userModel.findOne.mockResolvedValue(null);

    await updateEmployeeController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("should fail if not employee role", async () => {
    userModel.findOne.mockResolvedValue({
      role: "ADMIN",
    });

    await updateEmployeeController(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test("should fail if inactive", async () => {
    userModel.findOne.mockResolvedValue({
      role: "EMPLOYEE",
      employmentStatus: "IN-ACTIVE",
    });

    await updateEmployeeController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should fail if no fields provided", async () => {
    userModel.findOne.mockResolvedValue({
      role: "EMPLOYEE",
      employmentStatus: "ACTIVE",
    });

    await updateEmployeeController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should fail if email exists", async () => {
    userModel.findOne
      .mockResolvedValueOnce({
        role: "EMPLOYEE",
        employmentStatus: "ACTIVE",
        email: "old@test.com",
      })
      .mockResolvedValueOnce({ _id: "otherUser" });

    req.body.email = "new@test.com";

    await updateEmployeeController(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("should fail invalid DOB", async () => {
    userModel.findOne.mockResolvedValue({
      role: "EMPLOYEE",
      employmentStatus: "ACTIVE",
    });

    req.body.dateOfBirth = "invalid";

    await updateEmployeeController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should update employee successfully", async () => {
    const mockSave = jest.fn();

    const employee = {
      role: "EMPLOYEE",
      employmentStatus: "ACTIVE",
      email: "old@test.com",
      save: mockSave,
    };

    userModel.findOne.mockResolvedValue(employee);

    req.body = {
      firstName: "Updated",
    };

    await updateEmployeeController(req, res);

    expect(employee.firstName).toBe("Updated");
    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should handle server error", async () => {
    userModel.findOne.mockRejectedValue(new Error("DB error"));

    await updateEmployeeController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});