import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getOrganizationUsers } from "../api/employee";

const useEmployeesDetails = () => {

    const [employees, setEmployees] = useState([]);

    const fetchEmployees = useCallback(async () => {

        try {
            const response = await getOrganizationUsers();

            if (response?.success) {
                setEmployees(response.users || []);
            } else {
                toast.error(response?.message || "Failed to load employees");
            }
        } catch (error) {
            console.error("Failed to fetch employees:", error);
            toast.error("Could not fetch employees");
        }
    }, []);

    return { employees, setEmployees, fetchEmployees };
};

export default useEmployeesDetails;