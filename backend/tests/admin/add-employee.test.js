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