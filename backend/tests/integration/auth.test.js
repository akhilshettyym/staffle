import { api } from "../helpers/testServer.js";
import { activateOrg } from "../helpers/authHelper.js";
import { buildOrgPayload } from "../factories/dataFactory.js";

describe("Auth Integration Tests", () => {
  test("Create Organization", async () => {
    const payload = buildOrgPayload();

    const res = await api.post("/api/auth/create-organization").send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("Should fail duplicate org email", async () => {
    const payload = buildOrgPayload();

    await api.post("/api/auth/create-organization").send(payload);

    const res = await api.post("/api/auth/create-organization").send(payload);

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
  });

  test("Login success", async () => {
    const payload = buildOrgPayload();

    const org = await api.post("/api/auth/create-organization").send(payload);

    await activateOrg(org.body.organization._id);

    const res = await api.post("/api/auth/login").send({
      email: payload.email,
      password: payload.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});