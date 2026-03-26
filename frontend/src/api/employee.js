import api from "./instance/axios";
import { handleApiError, validateId, validatePayload } from "./helpers/apiHelpers";

export async function getOrganizationUsers() {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_EMPLOYEE_GET_EMPLOYEE}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getOrganizationInactiveUsers() {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_EMPLOYEE_GET_INACTIVE_EMPLOYEES}`);
        return res.data;

    } catch (error) {
        handleApiError(error);
    }
}

export async function acceptTask(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`${import.meta.env.VITE_API_EMPLOYEE_ACCEPT_TASKS}/${taskId}`);
    return res.data;
}

export async function requestRejection({ taskId, ...payload }) {
    validateId(taskId, "Task ID");
    validatePayload(payload);

    const res = await api.patch(`${import.meta.env.VITE_API_EMPLOYEE_REJECT_TASKS}/${taskId}`, payload);
    return res.data;
}

export async function markAsCompleted(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`${import.meta.env.VITE_API_EMPLOYEE_MARK_AS_COMPLETED}/${taskId}`);
    return res.data;
}

export async function markAsFailed(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`${import.meta.env.VITE_API_EMPLOYEE_MARK_AS_FAILED}/${taskId}`);
    return res.data;
}