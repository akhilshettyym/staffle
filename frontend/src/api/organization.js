import api from "./instance/axios";
import { validateId, validatePayload, handleApiError } from "./helpers/apiHelpers";

export async function updateOrganization({ orgId, ...payload }) {
    validateId(orgId, "Organization ID");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_ORGANIZATION_UPDATE_ORGANIZATION}/${orgId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getOrganizationDetails() {
    const res = await api.get(`${import.meta.env.VITE_API_ORGANIZATION_GET_ORGANIZATION_DETAILS}`);
    return res.data;
}