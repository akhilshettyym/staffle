import api from "./axios";

export async function getOrganizationUsers() {
    const res = await api.get("/api/employee/get-employees");
    return res.data;
}

export async function addEmployee() {
    const res = await api.get("/api/employee/add-employee");
    return res.data;
}