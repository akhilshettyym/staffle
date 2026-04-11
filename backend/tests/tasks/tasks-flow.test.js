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
  firstName: "Employee",
  lastName: "User",
  password: "password123",
  dateOfBirth: "1995-04-30",
  designation: "Software Engineer",
};

describe("Tasks - Get Task Details Flow", () => {
  let token;
  let employee1;
  let employee2;
  let employee3;

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

    const emp1 = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "emp1@test.com",
      });

    employee1 = emp1.body.employee._id;

    const emp2 = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "emp2@test.com",
      });

    employee2 = emp2.body.employee._id;

    const emp3 = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "emp3@test.com",
      });

    employee3 = emp3.body.employee._id;

    await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Task One",
        category: "Backend",
        description: "First task",
        assignedTo: employee1,
        dueDate: new Date(Date.now() + 86400000),
        priority: "HIGH",
      });

    await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Task Two",
        category: "Frontend",
        description: "Second task",
        assignedTo: employee2,
        dueDate: new Date(Date.now() + 86400000 * 2),
        priority: "MEDIUM",
      });

    await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Task Three",
        category: "DevOps",
        description: "Third task",
        assignedTo: employee3,
        dueDate: new Date(Date.now() + 86400000 * 3),
        priority: "LOW",
      });
  });

  test("Should get all tasks for organization", async () => {
    const res = await api
      .get("/api/tasks/get-tasks-details")
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.tasks).toBeDefined();
    expect(Array.isArray(res.body.tasks)).toBe(true);

    expect(res.body.count).toBe(3);

    expect(res.body.tasks[0]).toHaveProperty("title");
    expect(res.body.tasks[0]).toHaveProperty("assignedTo");
    expect(res.body.tasks[0]).toHaveProperty("priority");
    expect(res.body.tasks[0]).toHaveProperty("status");
  });

  test("Should return empty array if no tasks", async () => {
    const orgRes = await api.post("/api/auth/create-organization").send({
      ...orgPayload,
      email: "neworg@test.com",
      orgDomain: "neworg.com",
    });

    await activateOrg(orgRes.body.organization._id);

    const loginRes = await api.post("/api/auth/login").send({
      email: "neworg@test.com",
      password: orgPayload.password,
    });

    const newToken = loginRes.body.token;

    const res = await api
      .get("/api/tasks/get-tasks-details")
      .set("Cookie", [`token=${newToken}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(0);
    expect(res.body.tasks).toEqual([]);
  });

  test("Should fail without token", async () => {
    const res = await api.get("/api/tasks/get-tasks-details");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});