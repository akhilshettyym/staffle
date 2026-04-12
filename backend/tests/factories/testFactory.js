import { api } from "../helpers/testServer.js";
import { activateOrg, authCookie } from "../helpers/authHelper.js";
import { buildOrgPayload, buildEmployeePayload, buildTaskPayload } from "./dataFactory.js";

export async function createAdminSession(overrides = {}) {
  
  const orgPayload = buildOrgPayload(overrides);

  const res = await api.post("/api/auth/create-organization").send(orgPayload);

  const orgId = res.body.organization._id;
  const adminId = res.body.user._id;

  await activateOrg(orgId);

  const login = await api.post("/api/auth/login").send({
    email: orgPayload.email,
    password: orgPayload.password,
  });

  return {
    token: login.body.token,
    orgId,
    adminId,
    orgPayload,
  };
}

export async function createEmployeeSession(token, overrides = {}) {
  const payload = buildEmployeePayload(overrides);

  const res = await api
    .post("/api/admin/add-employee")
    .set("Cookie", authCookie(token))
    .send(payload);

  return res.body.employee;
}

export async function createTaskForEmployee(token, employeeId, overrides = {}) {
  const payload = buildTaskPayload({
    assignedTo: employeeId,
    ...overrides,
  });

  const res = await api
    .post("/api/admin/tasks/create-task")
    .set("Cookie", authCookie(token))
    .send(payload);

  if (res.statusCode !== 201) {
    throw new Error("Task creation failed");
  }

  return res.body.task;
}