import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
  default: {
    findById: jest.fn(),
  },
}));

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
  default: {
    create: jest.fn(),
  },
}));

const { createTaskController } = await import("../../../src/controllers/AdminControllers/createTask.controller.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");
const { default: userModel } = await import("../../../src/models/user.model.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("createTaskController - Unit", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => { });

    req = {
      body: {
        title: "Test Task",
        category: "Backend",
        description: "Test description",
        assignedTo: "emp123",
        dueDate: new Date(),
        priority: "HIGH",
      },
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

  test("should create task successfully", async () => {
    orgModel.findById.mockResolvedValue({
      _id: "org123",
      status: "ACTIVE",
    });

    userModel.findById.mockResolvedValue({
      _id: "emp123",
      organizationId: "org123",
      employmentStatus: "ACTIVE",
    });

    taskModel.create.mockResolvedValue({ _id: "task123" });

    await createTaskController(req, res);

    expect(taskModel.create).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("should fail if organization not found", async () => {
    orgModel.findById.mockResolvedValue(null);

    await createTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("should fail if organization is not active", async () => {
    orgModel.findById.mockResolvedValue({
      _id: "org123",
      status: "PENDING",
    });

    await createTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test("should fail if assigned user not found", async () => {
    orgModel.findById.mockResolvedValue({
      _id: "org123",
      status: "ACTIVE",
    });

    userModel.findById.mockResolvedValue(null);

    await createTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("should fail if user belongs to another organization", async () => {
    orgModel.findById.mockResolvedValue({
      _id: "org123",
      status: "ACTIVE",
    });

    userModel.findById.mockResolvedValue({
      _id: "emp123",
      organizationId: "org999",
      employmentStatus: "ACTIVE",
    });

    await createTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test("should fail if employee is inactive", async () => {
    orgModel.findById.mockResolvedValue({
      _id: "org123",
      status: "ACTIVE",
    });

    userModel.findById.mockResolvedValue({
      _id: "emp123",
      organizationId: "org123",
      employmentStatus: "IN-ACTIVE",
    });

    await createTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should handle server errors", async () => {
    orgModel.findById.mockRejectedValue(new Error("DB error"));

    await createTaskController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});