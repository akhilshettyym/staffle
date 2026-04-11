import { api } from "../helpers/testServer.js";
import { activateOrg } from "../helpers/authHelper.js";

const orgPayload = {
  firstName: "Akhil",
  lastName: "Shetty",
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

const employeePayload = {
  firstName: "Employee",
  lastName: "User",
  password: "password123",
  dateOfBirth: "1995-04-30",
  designation: "Software Engineer",
};

const updateEmployeePayload = {
  firstName: "Test3",
  lastName: "Sharma",
  email: "test3@taskbridge.com",
  designation: "Senior Developer",
  dateOfBirth: "1995-04-30",
};

describe("Employee Complete Lifecycle + Employee APIs", () => {
  let adminToken;
  let employeeToken;
  let employeeId;

  let task1;
  let task2;
  let task3;

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

    adminToken = loginRes.body.token;

    const empRes = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${adminToken}`])
      .send({
        ...employeePayload,
        email: "employee@test.com",
      });

    employeeId = empRes.body.employee._id;

    const t1 = await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${adminToken}`])
      .send({
        title: "Task 1",
        category: "Backend",
        description: "Complete API work",
        assignedTo: employeeId,
        dueDate: new Date(Date.now() + 86400000),
        priority: "HIGH",
      });

    task1 = t1.body.task._id;

    const t2 = await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${adminToken}`])
      .send({
        title: "Task 2",
        category: "Frontend",
        description: "Complete UI work",
        assignedTo: employeeId,
        dueDate: new Date(Date.now() + 86400000 * 2),
        priority: "MEDIUM",
      });

    task2 = t2.body.task._id;

    const t3 = await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${adminToken}`])
      .send({
        title: "Task 3",
        category: "DevOps",
        description: "Deployment setup",
        assignedTo: employeeId,
        dueDate: new Date(Date.now() + 86400000 * 3),
        priority: "LOW",
      });

    task3 = t3.body.task._id;

    const empLogin = await api.post("/api/auth/login").send({
      email: "employee@test.com",
      password: employeePayload.password,
    });

    employeeToken = empLogin.body.token;


    await api
      .patch(`/api/employee/tasks/accept-task/${task1}`)
      .set("Cookie", [`token=${employeeToken}`]);

    await api
      .patch(`/api/employee/tasks/accept-task/${task2}`)
      .set("Cookie", [`token=${employeeToken}`]);

    await api
      .patch(`/api/employee/tasks/accept-task/${task3}`)
      .set("Cookie", [`token=${employeeToken}`]);
  });


  test("Employee completes two tasks and fails one", async () => {
    const complete1 = await api
      .patch(`/api/employee/tasks/mark-as-completed/${task1}`)
      .set("Cookie", [`token=${employeeToken}`]);

    expect(complete1.statusCode).toBe(200);
    expect(complete1.body.task.status).toBe("COMPLETED");

    const fail = await api
      .patch(`/api/employee/tasks/mark-as-failed/${task2}`)
      .set("Cookie", [`token=${employeeToken}`])
      .send({
        reason:
          "This task depends on third party API which is currently down. Cannot proceed.",
      });

    expect(fail.statusCode).toBe(200);
    expect(fail.body.task.status).toBe("FAILED");

    const complete3 = await api
      .patch(`/api/employee/tasks/mark-as-completed/${task3}`)
      .set("Cookie", [`token=${employeeToken}`]);

    expect(complete3.statusCode).toBe(200);
    expect(complete3.body.task.status).toBe("COMPLETED");
  });


  test("Should update employee details", async () => {
    const res = await api
      .patch(`/api/employee/update-employee/${employeeId}`)
      .set("Cookie", [`token=${adminToken}`])
      .send(updateEmployeePayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.employee.firstName).toBe(updateEmployeePayload.firstName);
    expect(res.body.employee.lastName).toBe(updateEmployeePayload.lastName);
    expect(res.body.employee.email).toBe(updateEmployeePayload.email);
    expect(res.body.employee.designation).toBe(
      updateEmployeePayload.designation,
    );
  });


  test("Should get active employees", async () => {
    const res = await api
      .get("/api/employee/get-employees")
      .set("Cookie", [`token=${adminToken}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);

    expect(res.body.users[0]).toHaveProperty("firstName");
    expect(res.body.users[0]).toHaveProperty("email");
    expect(res.body.users[0].employmentStatus).toBe("ACTIVE");
  });


  test("Should get inactive employees", async () => {
    const res = await api
      .get("/api/employee/get-inactive-employees")
      .set("Cookie", [`token=${adminToken}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.count).toBeGreaterThanOrEqual(0);
  });
});