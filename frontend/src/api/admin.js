import api from "./instance/axios";
import { validateId, validatePayload, handleAdminError, handleApiError } from "./helpers/apiHelpers";

export async function updateAdmin({ empId, ...payload }) {
    validateId(empId, "Admin ID (empId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_ADMIN_UPDATE_ADMIN}/${empId}`, payload);
        return res.data;
    } catch (error) {
        handleAdminError(error);
    }
}

export async function reviewRejection({ taskId, ...payload }) {
    validateId(taskId, "Task ID (taskId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_ADMIN_REVIEW_TASK_REJECTION}/${taskId}`, payload);
        return res.data;
    } catch (error) {
        handleAdminError(error);
    }
}

export async function addEmployee(payload) {
    validatePayload(payload);

    try {
        const res = await api.post(`${import.meta.env.VITE_API_ADMIN_ADD_EMPLOYEE}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function updateEmployee({ empId, ...payload }) {
    validateId(empId, "Employee ID (empId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_EMPLOYEE_UPDATE_EMPLOYEE}/${empId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function deactivateEmployee({ empId }) {
    validateId(empId, "Employee ID (empId)");

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_ADMIN_DEACTIVATE_EMPLOYEE}/${empId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function reactivateEmployee({ empId }) {
    validateId(empId, "Employee ID (empId)");

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_ADMIN_REACTIVATE_EMPLOYEE}/${empId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function createTask(payload) {
    validatePayload(payload);

    const res = await api.post(`${import.meta.env.VITE_API_ADMIN_CREATE_TASKS}`, payload);
    return res.data;
}

export async function updateTask({ taskId, ...payload }) {
    validateId(taskId, "Task ID");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_ADMIN_UPDATE_TASKS}/${taskId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function deleteTask({ taskId }) {
    validateId(taskId, "Task ID");

    try {
        const res = await api.delete(`${import.meta.env.VITE_API_ADMIN_DELETE_TASK}/${taskId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}