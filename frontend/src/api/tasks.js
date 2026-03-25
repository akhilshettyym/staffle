import api from "./instance/axios";
import { validateId, validatePayload, handleApiError } from "./helpers/apiHelpers";

export async function createTask(payload) {
    validatePayload(payload);

    const res = await api.post(`${import.meta.env.VITE_API_CREATE_TASKS}`, payload);
    return res.data;
}

export async function updateTask({ taskId, ...payload }) {
    validateId(taskId, "Task ID");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_UPDATE_TASKS}/${taskId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function acceptTask(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`${import.meta.env.VITE_API_ACCEPT_TASKS}/${taskId}`);
    return res.data;
}

export async function requestRejection({ taskId, ...payload }) {
    validateId(taskId, "Task ID");
    validatePayload(payload);

    const res = await api.patch(`${import.meta.env.VITE_API_REJECT_TASKS}/${taskId}`, payload);
    return res.data;
}

export async function markAsCompleted(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`${import.meta.env.VITE_API_MARK_AS_COMPLETED}/${taskId}`);
    return res.data;
}

export async function markAsFailed(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`${import.meta.env.VITE_API_MARK_AS_FAILED}/${taskId}`);
    return res.data;
}

export async function deleteTask({ taskId }) {
    validateId(taskId, "Task ID");

    try {
        const res = await api.delete(`${import.meta.env.VITE_API_DELETE_TASK}/${taskId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getTaskDetails() {
    const res = await api.get(`${import.meta.env.VITE_API_GET_TASKS_DETAILS}`);
    return res.data;
}