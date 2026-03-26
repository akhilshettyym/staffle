import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getAllEmployeesDetails } from "../../api/superadmin";

const useAllEmployeeDetails = () => {

    const [allEmployees, setAllEmployees] = useState([]);

    const fetchAllEmployees = useCallback(async () => {

        try {
            const response = await getAllEmployeesDetails();
            setAllEmployees(response?.employees || []);

        } catch (error) {
            console.error("Failed to fetch Employees details", error);
            toast.error("Could not fetch employees");
        }
    }, []);

    return { allEmployees, setAllEmployees, fetchAllEmployees };
};

export default useAllEmployeeDetails;