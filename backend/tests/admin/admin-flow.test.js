import { api } from "../helpers/testServer.js";
import { activateOrg } from "../helpers/authHelper.js";

const orgPayload = {
  firstName: "Akhil",
  lastName: "Shetty",
  email: "admin23@test.com",
  password: "password123",
  confirmPassword: "password123",
  dateOfBirth: "1998-01-01",
  designation: "CEO",
  orgName: "Test Org",
  orgDomain: "testorg.com",
  orgDescription: "Project and employee management platform",
  orgCountry: "IN",
};

const employeePayload = {
  firstName: "Test4",
  lastName: "Sharma",
  password: "password123",
  dateOfBirth: "1995-04-30",
  designation: "Software Engineer",
};

describe("Admin - Add Employee", () => {
  let token;

  beforeEach(async () => {
    const res = await api
      .post("/api/auth/create-organization")
      .send(orgPayload);

    const orgId = res.body.organization._id;

    await activateOrg(orgId);

    const loginRes = await api.post("/api/auth/login").send({
      email: orgPayload.email,
      password: orgPayload.password,
    });

    token = loginRes.body.token;
  });

  test("Admin can add employee", async () => {
    const res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "emp1@test.com",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("Should fail if missing fields", async () => {
    const res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({ firstName: "Test" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("Should fail duplicate email", async () => {
    await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "duplicate@test.com",
      });

    const res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "duplicate@test.com",
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
  });
});


describe("Admin - Deactivate & Reactivate Employee", () => {
  let token;
  let employeeId;

  beforeEach(async () => {
    const res = await api
      .post("/api/auth/create-organization")
      .send(orgPayload);

    const orgId = res.body.organization._id;

    await activateOrg(orgId);

    const loginRes = await api.post("/api/auth/login").send({
      email: orgPayload.email,
      password: orgPayload.password,
    });

    token = loginRes.body.token;

    const empRes = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "emp1@test.com",
      });

    employeeId = empRes.body.employee._id;
  });

  test("Admin can deactivate employee", async () => {
    const res = await api
      .patch(`/api/admin/deactivate-employee/${employeeId}`)
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/removed/i);
  });

  test("Admin can reactivate employee", async () => {
    await api
      .patch(`/api/admin/deactivate-employee/${employeeId}`)
      .set("Cookie", [`token=${token}`]);

    const res = await api
      .patch(`/api/admin/reactivate-employee/${employeeId}`)
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/reactivated/i);
  });

  test("Should fail deactivate with invalid id", async () => {
    const res = await api
      .patch(`/api/admin/deactivate-employee/123456`)
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("Should fail reactivate without deactivating first", async () => {
    const res = await api
      .patch(`/api/admin/reactivate-employee/${employeeId}`)
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});


describe("Admin - Task CRUD Flow", () => {
  let token;
  let employeeId;
  let taskId;

  beforeEach(async () => {
    const orgRes = await api
      .post("/api/auth/create-organization")
      .send(orgPayload);

    const orgId = orgRes.body.organization._id;

    await activateOrg(orgId);

    const loginRes = await api.post("/api/auth/login").send({
      email: orgPayload.email,
      password: orgPayload.password,
    });

    token = loginRes.body.token;

    const empRes = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        firstName: "TestEmployee",
        lastName: "User",
        password: "password123",
        dateOfBirth: "1995-04-30",
        designation: "Software Engineer",
        email: "employee1@test.com",
      });

    employeeId = empRes.body.employee._id;
  });

  test("Admin can create task", async () => {
    const res = await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Fix API Bug",
        category: "Backend",
        description: "Fix authentication bug in login flow",
        assignedTo: employeeId,
        dueDate: new Date(Date.now() + 86400000),
        priority: "HIGH",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.task).toBeDefined();

    taskId = res.body.task._id;
  });

  test("Should fail task creation with invalid employee", async () => {
    const res = await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Invalid Task",
        category: "Backend",
        description: "Test",
        assignedTo: "1234567890abcdef12345678",
        dueDate: new Date(Date.now() + 86400000),
        priority: "HIGH",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  test("Admin can update task", async () => {
    const createRes = await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Initial Task",
        category: "Backend",
        description: "Initial description",
        assignedTo: employeeId,
        dueDate: new Date(Date.now() + 86400000),
        priority: "LOW",
      });

    const id = createRes.body.task._id;

    const res = await api
      .patch(`/api/admin/tasks/update-task/${id}`)
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Updated Task Title",
        priority: "HIGH",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.task.title).toBe("Updated Task Title");
  });

  test("Should fail update with invalid task id", async () => {
    const res = await api
      .patch(`/api/admin/tasks/update-task/123456`)
      .set("Cookie", [`token=${token}`])
      .send({
        title: "New Title",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  test("Admin can delete task", async () => {
    const createRes = await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Task to Delete",
        category: "Backend",
        description: "Delete this task",
        assignedTo: employeeId,
        dueDate: new Date(Date.now() + 86400000),
        priority: "MEDIUM",
      });

    const id = createRes.body.task._id;

    const res = await api
      .delete(`/api/admin/tasks/delete-task/${id}`)
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test("Should fail delete with invalid id", async () => {
    const res = await api
      .delete(`/api/admin/tasks/delete-task/123456`)
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});


const orgPayload2 = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@test.com",
  password: "password123",
  confirmPassword: "password123",
  dateOfBirth: "1998-01-01",
  designation: "CEO",
  orgName: "Test Org",
  orgDomain: "testorg.com",
  orgDescription: "Project and employee management platform",
  orgCountry: "IN",
};

const employeePayload2 = {
  firstName: "Employee",
  lastName: "User",
  password: "password123",
  dateOfBirth: "1995-04-30",
  designation: "Software Engineer",
};

const updatePayload = {
  firstName: "Akhil",
  lastName: "Shetty",
  email: "akhil@gmail.com",
  dateOfBirth: "2003-03-29",
  designation: "CEO",
};

describe("Admin Update API", () => {
  let token;
  let adminId;

  beforeEach(async () => {
    const orgRes = await api
      .post("/api/auth/create-organization")
      .send(orgPayload2);

    const orgId = orgRes.body.organization._id;
    adminId = orgRes.body.user._id;

    await activateOrg(orgId);

    const loginRes = await api.post("/api/auth/login").send({
      email: orgPayload2.email,
      password: orgPayload2.password,
    });

    token = loginRes.body.token;

    await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload2,
        email: "employee@test.com",
      });
  });

  test("Admin can update own profile", async () => {
    const res = await api
      .patch(`/api/admin/update-admin/${adminId}`)
      .set("Cookie", [`token=${token}`])
      .send(updatePayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.admin.firstName).toBe(updatePayload.firstName);
    expect(res.body.admin.lastName).toBe(updatePayload.lastName);
    expect(res.body.admin.email).toBe(updatePayload.email);
    expect(res.body.admin.designation).toBe(updatePayload.designation);
  });

  test("Should fail with no fields", async () => {
    const res = await api
      .patch(`/api/admin/update-admin/${adminId}`)
      .set("Cookie", [`token=${token}`])
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});