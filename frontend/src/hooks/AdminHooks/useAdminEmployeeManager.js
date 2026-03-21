import { useState } from "react";
import { getOrganizationInactiveUsers, getOrganizationUsers } from "../../api/employee";
import toast from "react-hot-toast";

const useAdminEmployeeManager = () => {

    const [employees, setEmployees] = useState([]);
    const [inactiveEmp, setInactiveEmp] = useState([]);

    const fetchEmployees = async () => {
        try {
            const response = await getOrganizationUsers();
            setEmployees(response?.users || []);
        } catch (error) {
            console.error("Failed to fetch employees", error);
            toast.error("Could not fetch employees");
        }
    };

    const fetchInactiveEmployees = async () => {
        try {
            const response = await getOrganizationInactiveUsers();
            setInactiveEmp(response?.users || []);
        } catch (error) {
            console.error("Failed to fetch IN-ACTIVE employees", error);
            toast.error("Could not fetch IN-ACTIVE employees");
        }
    };

    const refreshEmployeesData = async () => {
        await Promise.all([
            fetchEmployees(),
            fetchInactiveEmployees()
        ]);
    };

    return { employees, inactiveEmp, setInactiveEmp, setEmployees, fetchEmployees, fetchInactiveEmployees, refreshEmployeesData };

}

export default useAdminEmployeeManager;