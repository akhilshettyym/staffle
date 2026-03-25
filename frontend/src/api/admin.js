import api from "./instance/axios";
import { validateId, validatePayload, handleAdminError } from "./helpers/apiHelpers";

export async function updateAdmin({ empId, ...payload }) {
    validateId(empId, "Admin ID (empId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_UPDATE_ADMIN}/${empId}`, payload);
        return res.data;
    } catch (error) {
        handleAdminError(error);
    }
}

export async function reviewRejection({ taskId, ...payload }) {
    validateId(taskId, "Task ID (taskId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`${import.meta.env.VITE_API_REVIEW_TASK_REJECTION}/${taskId}`, payload);
        return res.data;
    } catch (error) {
        handleAdminError(error);
    }
}