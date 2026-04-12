import { api } from "../helpers/testServer.js";
import { createTestWorld } from "../setup/testWorld.js";
import { authCookie } from "../helpers/authHelper.js";

describe("Organization Flow - Lifecycle", () => {
  let world;

  beforeEach(async () => {
    world = await createTestWorld();
  });

  test("Admin updates organization", async () => {
    const res = await api
      .patch(`/api/organization/update-organization/${world.orgId}`)
      .set("Cookie", authCookie(world.admin.token))
      .send({
        orgName: "Updated Org",
        orgDomain: "updated.com",
        orgCountry: "IN",
        orgDescription: "Updated description",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.organization.orgName).toBe("Updated Org");
  });

  test("Get organization details", async () => {
    const res = await api
      .get("/api/organization/get-organization-details")
      .set("Cookie", authCookie(world.admin.token));

    expect(res.statusCode).toBe(200);
    expect(res.body.organization).toBeDefined();
  });

  test("Unauthorized access fails", async () => {
    const res = await api.get("/api/organization/get-organization-details");

    expect(res.statusCode).toBe(401);
  });
});