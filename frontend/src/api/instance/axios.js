import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default api;