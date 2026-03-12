import api from "./instance/axios";
import { validatePayload, handleAuthError } from "./helpers/apiHelpers";

export async function createOrganization(payload) {
    validatePayload(payload);

    try {
        const res = await api.post("/auth/create-org", payload);
        return res.data;
    } catch (error) {
        handleAuthError(error);
    }
}

export async function login(payload) {
    validatePayload(payload);

    try {
        const res = await api.post("/auth/login", payload);
        return res.data;
    } catch (error) {
        handleAuthError(error);
    }
}

export async function logout() {
    try {
        const res = await api.post("/auth/logout");
        return res.data;
    } catch (error) {
        handleAuthError(error);
    }
}