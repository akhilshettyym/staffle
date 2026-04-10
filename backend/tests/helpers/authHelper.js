import orgModel from "../../src/models/org.model.js";

export async function activateOrg(orgId) {
  await orgModel.findByIdAndUpdate(orgId, { status: "ACTIVE" });
}