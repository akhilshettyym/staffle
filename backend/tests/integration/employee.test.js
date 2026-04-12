import { api } from "../helpers/testServer.js";
import { createTestWorld } from "../setup/testWorld.js";
import { authCookie } from "../helpers/authHelper.js";

describe("Employee Integration Tests", () => {
  let world;

  beforeEach(async () => {
    world = await createTestWorld();
  });

  test("Get employees list", async () => {
    const res = await api
      .get("/api/employee/get-employees")
      .set("Cookie", authCookie(world.admin.token));

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  test("Get inactive employees", async () => {
    const res = await api
      .get("/api/employee/get-inactive-employees")
      .set("Cookie", authCookie(world.admin.token));

    expect(res.statusCode).toBe(200);
  });
});