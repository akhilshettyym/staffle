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