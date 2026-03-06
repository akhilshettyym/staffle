import api from "./axios";

export async function createOrganization(payload) {
    const res = await api.post("/api/auth/create-org", payload);
    return res.data;
}