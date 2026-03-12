import api from "./axios";

export async function approveOrganization() {
    const res = await api.patch("/org/approve-org/:orgID");
    return res.data;
}

export async function rejectOrganization() {
    const res = await api.patch("/org/reject-org/:orgID");
    return res.data;
}

export async function revokeOrganization() {
    const res = await api.patch("/org/revoke-org/:orgID");
    return res.data;
}

export async function reActivateOrganization() {
    const res = await api.patch("/org/re-activate-org/:orgID");
    return res.data;
}

export async function updateOrganization({ orgId, ...payload }) {
    if (!orgId) throw new Error("orgId is required");

    try {
        const res = await api.patch(`/org/update-organization/${orgId}`, payload);
        return res.data;

    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error("Organization not found");
        }
        if (error.response?.status === 403) {
            throw new Error("You don't have permission to update organization details");
        }
        throw error;
    }
}

export async function getOrganizationDetails() {
    const res = await api.get("/org/get-organization-details");
    return res.data;
}