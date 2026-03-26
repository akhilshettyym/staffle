import api from "./instance/axios";

export async function getAllOrganizationDetails() {
    const res = await api.get(`${import.meta.env.VITE_API_SUPERADMIN_GET_ALL_ORGANIZATIONS}`);
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