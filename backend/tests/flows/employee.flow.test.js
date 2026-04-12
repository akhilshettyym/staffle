import { api } from "../helpers/testServer.js";
import { activateOrg } from "../helpers/authHelper.js";
import { buildOrgPayload, buildEmployeePayload } from "../factories/dataFactory.js";

describe("Employee Flow", () => {
  let token;

  beforeEach(async () => {
    const orgPayload = buildOrgPayload();

    const orgRes = await api
      .post("/api/auth/create-organization")
      .send(orgPayload);

    await activateOrg(orgRes.body.organization._id);

    const loginRes = await api.post("/api/auth/login").send({
      email: orgPayload.email,
      password: orgPayload.password,
    });

    token = loginRes.body.token;
  });

  test("Add employee", async () => {
    const empPayload = buildEmployeePayload();

    const res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send(empPayload);

    expect(res.statusCode).toBe(201);
    expect(res.body.employee).toBeDefined();
  });
});