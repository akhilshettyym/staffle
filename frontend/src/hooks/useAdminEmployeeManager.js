import { useState } from "react";
import { getOrganizationUsers } from "../api/employee";
import toast from "react-hot-toast";

const useAdminEmployeeManager = () => {

    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        try {
            const response = await getOrganizationUsers();
            setEmployees(response?.users || []);
        } catch (error) {
            console.error("Failed to fetch employees", error);
            toast.error("Could not fetch employees");
        }
    };

    return { employees, setEmployees, fetchEmployees };
}

export default useAdminEmployeeManager;