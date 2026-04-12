import { createAdminSession, createEmployeeSession } from "../factories/testFactory.js";

export async function createTestWorld(options = {}) {
  const admin = await createAdminSession(options.org);

  const employee =
    options.withEmployee !== false
      ? await createEmployeeSession(admin.token)
      : null;

  return {
    admin,
    employee,
  };
}