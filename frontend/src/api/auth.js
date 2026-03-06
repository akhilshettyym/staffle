import api from "./axios";

export async function createOrganization(payload) {
    const res = await api.post("/api/auth/create-org", payload);
    return res.data;
}

export async function addEmployee(payload) {
    const res= await api.post("/api/employee/add-employee", payload);
    return res.data;
}

export async function login(payload) {
    const res = await api.post("/api/auth/login", payload);
    return res.data;
}
export async function logout() {
    const res = await api.post("/api/auth/logout");
    return res.data;
}