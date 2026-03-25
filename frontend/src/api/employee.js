import api from "./instance/axios";
import { validateId, validatePayload, handleApiError } from "./helpers/apiHelpers";

export async function addEmployee(payload) {
    validatePayload(payload);

    try {
        const res = await api.post(`${import.meta.env.VITE_API_ADD_EMPLOYEE}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function updateEmployee({ empId, ...payload }) {
    validateId(empId, "Employee ID (empId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_UPDATE_EMPLOYEE}/${empId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function deactivateEmployee({ empId }) {
    validateId(empId, "Employee ID (empId)");

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_DEACTIVATE_EMPLOYEE}/${empId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function reactivateEmployee({ empId }) {
    validateId(empId, "Employee ID (empId)");

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_REACTIVATE_EMPLOYEE}/${empId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getOrganizationUsers() {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_GET_EMPLOYEE}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getOrganizationInactiveUsers() {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_GET_INACTIVE_EMPLOYEES}`);
        return res.data;

    } catch (error) {
        handleApiError(error);
    }
}