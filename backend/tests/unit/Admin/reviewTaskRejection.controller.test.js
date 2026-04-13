import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
  default: {
    findOne: jest.fn(),
  },
}));

const { reviewTaskRejectionController } = await import("../../../src/controllers/AdminControllers/reviewTaskRejection.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("reviewTaskRejectionController - Unit", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => { });

    req = {
      params: { taskId: "task123" },
      body: {
        decision: "APPROVED",
      },
      user: {
        role: "ADMIN",
        organizationId: "org123",
        _id: "admin123",
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

  test("should fail if not ADMIN", async () => {
    req.user.role = "EMPLOYEE";

    await reviewTaskRejectionController(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test("should fail if no rejection pending", async () => {
    taskModel.findOne.mockResolvedValue(null);

    await reviewTaskRejectionController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should approve and reassign task", async () => {
    const mockSave = jest.fn();

    const task = {
      status: "REJECTION_REQUESTED",
      rejection: {},
      save: mockSave,
    };

    taskModel.findOne.mockResolvedValue(task);

    req.body = {
      decision: "APPROVED",
      reassignTo: "emp999",
    };

    await reviewTaskRejectionController(req, res);

    expect(task.assignedTo).toBe("emp999");
    expect(task.status).toBe("NEW");
    expect(mockSave).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should approve without reassignment (FAILED)", async () => {
    const mockSave = jest.fn();

    const task = {
      status: "REJECTION_REQUESTED",
      rejection: {},
      save: mockSave,
    };

    taskModel.findOne.mockResolvedValue(task);

    req.body = { decision: "APPROVED" };

    await reviewTaskRejectionController(req, res);

    expect(task.status).toBe("FAILED");
  });

  test("should reject with admin reason", async () => {
    const mockSave = jest.fn();

    const task = {
      status: "REJECTION_REQUESTED",
      rejection: {},
      save: mockSave,
    };

    taskModel.findOne.mockResolvedValue(task);

    req.body = {
      decision: "REJECTED",
      adminReason: "Invalid work",
    };

    await reviewTaskRejectionController(req, res);

    expect(task.rejection.status).toBe("REJECTED");
    expect(task.status).toBe("NEW");
  });

  test("should fail if reject without reason", async () => {
    const task = {
      status: "REJECTION_REQUESTED",
      rejection: {},
      save: jest.fn(),
    };

    taskModel.findOne.mockResolvedValue(task);

    req.body = { decision: "REJECTED" };

    await reviewTaskRejectionController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should handle server error", async () => {
    taskModel.findOne.mockRejectedValue(new Error("DB error"));

    await reviewTaskRejectionController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});