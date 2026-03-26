import api from "./instance/axios";

export async function getTaskDetails() {
    const res = await api.get(`${import.meta.env.VITE_API_GET_TASKS_DETAILS}`);
    return res.data;
}