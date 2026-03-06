import api from "./axios";

export async function getOrganizationUsers() {
    const res = await api.get("/api/employee/get-employees");
    return res.data;
}