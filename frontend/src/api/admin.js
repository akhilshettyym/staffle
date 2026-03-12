import api from "./instance/axios";
import { validateId, validatePayload, handleAdminError } from "./helpers/apiHelpers";

export async function updateAdmin({ empId, ...payload }) {
    validateId(empId, "Admin ID (empId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`/admin/update-admin/${empId}`, payload);
        return res.data;
    } catch (error) {
        handleAdminError(error);
    }
}

export async function reviewRejection({ taskId, ...payload }) {
    validateId(taskId, "Task ID (taskId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`/admin/review-task-rejection/${taskId}`, payload);
        return res.data;
    } catch (error) {
        handleAdminError(error);
    }
}