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

const updatePayload = {
  orgName: "TaskBridge",
  orgDomain: "taskbridge.com",
  orgCountry: "IN",
  orgDescription:
    "TaskBridge is a platform that connects individuals and businesses to complete tasks efficiently. Our mission is to simplify the process of getting things done, whether it's for personal or professional use.",
};

describe("Organization - Update & Get Details Flow", () => {
  let token;
  let orgId;

  beforeEach(async () => {
    const orgRes = await api
      .post("/api/auth/create-organization")
      .send(orgPayload);

    orgId = orgRes.body.organization._id;

    await activateOrg(orgId);

    const loginRes = await api.post("/api/auth/login").send({
      email: orgPayload.email,
      password: orgPayload.password,
    });

    token = loginRes.body.token;

    await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "emp1@test.com",
      });

    await api
      .post("/api/admin/add-employee")
      .set("Cookie", [`token=${token}`])
      .send({
        ...employeePayload,
        email: "emp2@test.com",
      });
  });

  test("Admin can update organization", async () => {
    const res = await api
      .patch(`/api/organization/update-organization/${orgId}`)
      .set("Cookie", [`token=${token}`])
      .send(updatePayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.organization.orgName).toBe(updatePayload.orgName);
    expect(res.body.organization.orgDomain).toBe(updatePayload.orgDomain);
    expect(res.body.organization.orgCountry).toBe(updatePayload.orgCountry);
  });

  test("Should return updated organization details", async () => {
    await api
      .patch(`/api/organization/update-organization/${orgId}`)
      .set("Cookie", [`token=${token}`])
      .send(updatePayload);

    const res = await api
      .get("/api/organization/get-organization-details")
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.organization).toBeDefined();

    expect(res.body.organization.orgName).toBe(updatePayload.orgName);
    expect(res.body.organization.orgDomain).toBe(updatePayload.orgDomain);
    expect(res.body.organization.orgCountry).toBe(updatePayload.orgCountry);
    expect(res.body.organization.orgDescription).toBe(
      updatePayload.orgDescription,
    );
  });

  test("Should fail update with no fields", async () => {
    const res = await api
      .patch(`/api/organization/update-organization/${orgId}`)
      .set("Cookie", [`token=${token}`])
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("Should fail get organization without token", async () => {
    const res = await api.get("/api/organization/get-organization-details");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});