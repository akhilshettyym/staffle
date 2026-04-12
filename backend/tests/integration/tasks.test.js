import { api } from "../helpers/testServer.js";
import { activateOrg } from "../helpers/authHelper.js";
import { authCookie } from "../helpers/authHelper.js";
import { buildEmployeePayload, buildTaskPayload } from "../factories/dataFactory.js";
import { createAdminSession } from "../factories/testFactory.js";

describe("Tasks - Get Task Details Flow", () => {
  let admin;
  let token;
  let employee1;
  let employee2;
  let employee3;

  beforeEach(async () => {
    admin = await createAdminSession();
    token = admin.token;

    await activateOrg(admin.orgId);

    const emp1Res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", authCookie(token))
      .send({
        ...buildEmployeePayload(),
        email: "emp1@test.com",
      });

    employee1 = emp1Res.body.employee._id;

    const emp2Res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", authCookie(token))
      .send({
        ...buildEmployeePayload(),
        email: "emp2@test.com",
      });

    employee2 = emp2Res.body.employee._id;

    const emp3Res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", authCookie(token))
      .send({
        ...buildEmployeePayload(),
        email: "emp3@test.com",
      });

    employee3 = emp3Res.body.employee._id;

    await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", authCookie(token))
      .send(
        buildTaskPayload({
          title: "Task One",
          category: "Backend",
          description: "First task",
          assignedTo: employee1,
        }),
      );

    await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", authCookie(token))
      .send(
        buildTaskPayload({
          title: "Task Two",
          category: "Frontend",
          description: "Second task",
          assignedTo: employee2,
        }),
      );

    await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", authCookie(token))
      .send(
        buildTaskPayload({
          title: "Task Three",
          category: "DevOps",
          description: "Third task",
          assignedTo: employee3,
        }),
      );
  });

  test("Should get all tasks for organization", async () => {
    const res = await api
      .get("/api/tasks/get-tasks-details")
      .set("Cookie", authCookie(token));

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(res.body.count).toBe(3);

    expect(res.body.tasks[0]).toHaveProperty("title");
    expect(res.body.tasks[0]).toHaveProperty("assignedTo");
    expect(res.body.tasks[0]).toHaveProperty("priority");
    expect(res.body.tasks[0]).toHaveProperty("status");
  });

  test("Should return empty array if no tasks", async () => {
    const emptyAdmin = await createAdminSession({
      org: {
        email: "neworg@test.com",
        orgDomain: "neworg.com",
      },
    });

    const res = await api
      .get("/api/tasks/get-tasks-details")
      .set("Cookie", authCookie(emptyAdmin.token));

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