import api from "./axios";

export async function updateAdmin({ empId, ...payload }) {
    if (!empId) throw new Error("empId is required");

    try {
        const res = await api.patch(`/admin/update-admin/${empId}`, payload);
        return res.data;

    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error("Admin not found");
        }
        if (error.response?.status === 403) {
            throw new Error("You don't have permission to update admin details");
        }
        throw error;
    }
}

export async function reviewRejection(payload) {
    const res = await api.patch("/admin/review-task-rejection/:taskId", payload);
    return res.data;
}