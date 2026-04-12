import { api } from "../helpers/testServer.js";
import { createTestWorld } from "../setup/testWorld.js";
import { authCookie } from "../helpers/authHelper.js";

describe("Admin Integration Tests", () => {
  let world;

  beforeEach(async () => {
    world = await createTestWorld();
  });

  test("Add employee", async () => {
    const res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", authCookie(world.admin.token))
      .send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "password123",
        dateOfBirth: "1995-01-01",
        designation: "Dev",
      });

    expect(res.statusCode).toBe(201);
  });

  test("Reject invalid employee", async () => {
    const res = await api
      .post("/api/admin/add-employee")
      .set("Cookie", authCookie(world.admin.token))
      .send({ firstName: "OnlyName" });

    expect(res.statusCode).toBe(400);
  });

  test("Deactivate employee invalid id", async () => {
    const res = await api
      .patch("/api/admin/deactivate-employee/123")
      .set("Cookie", authCookie(world.admin.token));

    expect(res.statusCode).toBe(400);
  });
});