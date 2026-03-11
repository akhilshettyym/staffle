import api from "./axios";

export async function addEmployee(payload) {
    const res = await api.post("/employee/add-employee", payload);
    return res.data;
}

export async function updateEmployee({ empId, ...payload }) {
    if(!empId) throw new Error("empId is required");

    try {
        const res = await api.patch(`/employee/update-employee/${empId}`, payload);
        return res.data;

    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error("Employee not found");
        }
        if (error.response?.status === 403) {
            throw new Error("You don't have permission to update this employee");
        }
        throw error;
    }
}

export async function deactivateEmployee({ empId }) {
    if (!empId) throw new Error("empId is required");

    try {
        const res = await api.patch(`/employee/deactivate-employee/${empId}`);
        return res.data;

    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error("Employee not found");
        }
        if (error.response?.status === 403) {
            throw new Error("You don't have permission to remove employee")
        }
        throw error;
    }
}

export async function getOrganizationUsers() {
    const res = await api.get("/employee/get-employees");
    return res.data;
}