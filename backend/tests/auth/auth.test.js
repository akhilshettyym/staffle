import { activateOrg } from "../helpers/authHelper.js";
import { api } from "../helpers/testServer.js";

const payload = {
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

describe("Auth Routes", () => {
  test("Create Organization", async () => {
    const res = await api.post("/api/auth/create-organization").send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.organization).toBeDefined();
    expect(res.body.user).toBeDefined();
  });

  test("Should fail if email already exists", async () => {
    await api.post("/api/auth/create-organization").send(payload);

    const res = await api.post("/api/auth/create-organization").send(payload);

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/already/i);
  });

  test("Should fail password mismatch", async () => {
    const res = await api.post("/api/auth/create-organization").send({
      ...payload,
      confirmPassword: "wrongpassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  describe("Login", () => {
    test("Should login successfully", async () => {
      const createRes = await api
        .post("/api/auth/create-organization")
        .send(payload);

      await activateOrg(createRes.body.organization._id);

      const res = await api.post("/api/auth/login").send({
        email: payload.email,
        password: payload.password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toBeDefined();
      expect(res.body.token).toBeDefined();
    });

    test("Should fail invalid password", async () => {
      await api.post("/api/auth/create-organization").send(payload);

      const res = await api.post("/api/auth/login").send({
        email: payload.email,
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test("Should fail user not found", async () => {
      const res = await api.post("/api/auth/login").send({
        email: "nouser@test.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test("Should fail missing email", async () => {
      const res = await api.post("/api/auth/login").send({
        password: "password123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test("Should fail missing password", async () => {
      const res = await api.post("/api/auth/login").send({
        email: "test@test.com",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("Logout", () => {
    test("Should logout successfully", async () => {
      const res = await api.post("/api/auth/logout");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/logged out/i);
    });
  });
});