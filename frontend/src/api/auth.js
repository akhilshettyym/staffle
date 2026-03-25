import api from "./instance/axios";
import { validatePayload, handleAuthError } from "./helpers/apiHelpers";

export async function createOrganization(payload) {
    validatePayload(payload);

    try {
        const res = await api.post(`${import.meta.env.VITE_API_CREATE_ORG}`, payload);
        return res.data;
    } catch (error) {
        handleAuthError(error);
    }
}

export async function login(payload) {
    validatePayload(payload);

    try {
        const res = await api.post(`${import.meta.env.VITE_API_LOGIN}`, payload);
        return res.data;
    } catch (error) {
        handleAuthError(error);
    }
}

export async function logoutUser() {
    try {
        const res = await api.post(`${import.meta.env.VITE_API_LOGOUT}`);
        return res.data;
    } catch (error) {
        handleAuthError(error);
    }
}