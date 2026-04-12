import { api } from "../helpers/testServer.js";
import { activateOrg } from "../helpers/authHelper.js";
import { buildOrgPayload, buildEmployeePayload, buildTaskPayload } from "../factories/dataFactory.js";

describe("Admin Flow - Complete Lifecycle", () => {
  let token;
  let adminId;
  let employeeId;

  beforeEach(async () => {
    const orgPayload = buildOrgPayload();

    const orgRes = await api
      .post("/api/auth/create-organization")
      .send(orgPayload);

    const orgId = orgRes.body.organization._id;
    adminId = orgRes.body.user._id;

    await activateOrg(orgId);

    const loginRes = await api.post("/api/auth/login").send({
      email: orgPayload.email,
      password: orgPayload.password,
    });

    token = loginRes.body.token;

    const empPayload = buildEmployeePayload();

    const empRes = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send(empPayload);

    employeeId = empRes.body.employee._id;
  });

  test("Admin task lifecycle", async () => {
    const taskPayload = buildTaskPayload({ assignedTo: employeeId });

    const taskRes = await api
      .post("/api/admin/tasks/create-task")
      .set("Cookie", [`token=${token}`])
      .send(taskPayload);

    expect([200, 201]).toContain(taskRes.statusCode);

    const taskId = taskRes.body.task._id;

    const updateRes = await api
      .patch(`/api/admin/tasks/update-task/${taskId}`)
      .set("Cookie", [`token=${token}`])
      .send({ title: "Updated Task Title" });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.task.title).toBe("Updated Task Title");
  });
});