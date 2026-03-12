import api from "./instance/axios";
import { validateId, validatePayload, handleApiError } from "./helpers/apiHelpers";

export async function approveOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`/org/approve-org/${orgId}`);
    return res.data;
}

export async function rejectOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`/org/reject-org/${orgId}`);
    return res.data;
}

export async function revokeOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`/org/revoke-org/${orgId}`);
    return res.data;
}

export async function reActivateOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`/org/re-activate-org/${orgId}`);
    return res.data;
}

export async function updateOrganization({ orgId, ...payload }) {
    validateId(orgId, "Organization ID");
    validatePayload(payload);

    try {
        const res = await api.patch(`/org/update-organization/${orgId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getOrganizationDetails() {
    const res = await api.get("/org/get-organization-details");
    return res.data;
}