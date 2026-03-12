import api from "./instance/axios";
import { validateId, validatePayload, handleApiError } from "./helpers/apiHelpers";

export async function createTask(payload) {
    validatePayload(payload);

    const res = await api.post("/tasks/create-task", payload);
    return res.data;
}

export async function updateTask({ taskId, ...payload }) {
    validateId(taskId, "Task ID");
    validatePayload(payload);

    try {
        const res = await api.patch(`/tasks/update-task/${taskId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function acceptTask(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`/tasks/accept-task/${taskId}`);
    return res.data;
}

export async function requestRejection({ taskId, ...payload }) {
    validateId(taskId, "Task ID");
    validatePayload(payload);

    const res = await api.patch(`/tasks/reject-task/${taskId}`, payload);
    return res.data;
}

export async function markAsCompleted(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`/tasks/mark-as-completed/${taskId}`);
    return res.data;
}

export async function markAsFailed(taskId) {
    validateId(taskId, "Task ID");

    const res = await api.patch(`/tasks/mark-as-failed/${taskId}`);
    return res.data;
}

export async function deleteTask({ taskId }) {
    validateId(taskId, "Task ID");

    try {
        const res = await api.delete(`/tasks/delete-task/${taskId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getTaskDetails() {
    const res = await api.get("/tasks/get-tasks-details");
    return res.data;
}