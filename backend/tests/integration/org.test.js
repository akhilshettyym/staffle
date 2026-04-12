import { api } from "../helpers/testServer.js";
import { createTestWorld } from "../setup/testWorld.js";
import { authCookie } from "../helpers/authHelper.js";

describe("Organization Integration Tests", () => {
  let world;

  beforeEach(async () => {
    world = await createTestWorld();
  });

  test("Get organization details", async () => {
    const res = await api
      .get("/api/organization/get-organization-details")
      .set("Cookie", authCookie(world.admin.token));

    expect(res.statusCode).toBe(200);
    expect(res.body.organization).toBeDefined();
  });

  test("Fail without token", async () => {
    const res = await api.get("/api/organization/get-organization-details");

    expect(res.statusCode).toBe(401);
  });
});