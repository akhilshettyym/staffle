import api from "./instance/axios";
import { validateId, validatePayload, handleApiError } from "./helpers/apiHelpers";

export async function addEmployee(payload) {
    validatePayload(payload);

    try {
        const res = await api.post("/employee/add-employee", payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function updateEmployee({ empId, ...payload }) {
    validateId(empId, "Employee ID (empId)");
    validatePayload(payload);

    try {
        const res = await api.patch(`/employee/update-employee/${empId}`, payload);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function deactivateEmployee({ empId }) {
    validateId(empId, "Employee ID (empId)");

    try {
        const res = await api.patch(`/employee/deactivate-employee/${empId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getOrganizationUsers() {
    try {
        const res = await api.get("/employee/get-employees");
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
}

export async function getOrganizationInactiveUsers() {
    try {
        const res = await api.get("/employee/get-inactive-employees");
        return res.data;
        
    } catch (error) {
        handleApiError(error);
    }
}