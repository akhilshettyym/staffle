import api from "./instance/axios";
import { validateId, validatePayload, handleApiError } from "./helpers/apiHelpers";

export async function approveOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`${import.meta.env.VITE_API_APPROVE_ORGANIZATION}/${orgId}`);
    return res.data;
}

export async function rejectOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`${import.meta.env.VITE_API_REJECT_ORGANIZATION}/${orgId}`);
    return res.data;
}

export async function revokeOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`${import.meta.env.VITE_API_REVOKE_ORGANIZATION}/${orgId}`);
    return res.data;
}

export async function reActivateOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`${import.meta.env.VITE_API_RE_ACTIVATE_ORGANIZATION}/${orgId}`);
    return res.data;
}

export async function updateOrganization({ orgId, ...payload }) {
    validateId(orgId, "Organization ID");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_UPDATE_ORGANIZATION}/${orgId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getOrganizationDetails() {
    const res = await api.get(`${import.meta.env.VITE_API_GET_ORGANIZATION_DETAILS}`);
    return res.data;
}