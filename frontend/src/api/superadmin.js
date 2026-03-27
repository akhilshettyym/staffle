import { validateId } from "./helpers/apiHelpers";
import api from "./instance/axios";

export async function getAllOrganizationDetails() {
    const res = await api.get(`${import.meta.env.VITE_API_SUPERADMIN_GET_ALL_ORGANIZATIONS}`);
    return res.data;
}

export async function getSpecificOrganizationDetails(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.get(`${import.meta.env.VITE_API_SUPERADMIN_GET_SPECIFIC_ORGANIZATIONS}/${orgId}`);
    return res.data;
}

export async function getOrganizationSpecificEmployeeDetails(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.get(`${import.meta.env.VITE_API_SUPERADMIN_GET_SPECIFIC_EMPLOYEES}/${orgId}`);
    return res.data;
}

export async function getOrganizationSpecificTasksDetails(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.get(`${import.meta.env.VITE_API_SUPERADMIN_GET_SPECIFIC_TASKS}/${orgId}`);
    return res.data;
}

export async function getAllEmployeesDetails() {
    const res = await api.get(`${import.meta.env.VITE_API_SUPERADMIN_GET_ALL_EMPLOYEES}`);
    return res.data;
}

export async function getAlltasksDetails() {
    const res = await api.get(`${import.meta.env.VITE_API_SUPERADMIN_GET_ALL_TASKS}`);
    return res.data;
}

export async function approveOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`${import.meta.env.VITE_API_SUPERADMIN_APPROVE_ORGANIZATION}/${orgId}`);
    return res.data;
}

export async function rejectOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`${import.meta.env.VITE_API_SUPERADMIN_REJECT_ORGANIZATION}/${orgId}`);
    return res.data;
}

export async function revokeOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`${import.meta.env.VITE_API_SUPERADMIN_REVOKE_ORGANIZATION}/${orgId}`);
    return res.data;
}

export async function reActivateOrganization(orgId) {
    validateId(orgId, "Organization ID");

    const res = await api.patch(`${import.meta.env.VITE_API_SUPERADMIN_RE_ACTIVATE_ORGANIZATION}/${orgId}`);
    return res.data;
}

export async function deleteRejectedOrganization({ orgId }) {
    validateId(orgId, "Organization ID");

    try {
        const res = await api.delete(`${import.meta.env.VITE_API_SUPERADMIN_DELETE_ORGANIZATION}/${orgId}`);
        return res.data;

    } catch (error) {
        handleApiError(error);
    }
}