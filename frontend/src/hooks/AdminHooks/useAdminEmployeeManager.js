import { useState } from "react";
import { getOrganizationInactiveUsers } from "../../api/employee";
import toast from "react-hot-toast";
import useTasksDetails from "../../utils/useTasksDetails";
import useEmployeesDetails from "../../utils/useEmployeesDetails";

const useAdminEmployeeManager = () => {

    const [inactiveEmp, setInactiveEmp] = useState([]);
    const [activeTab, setActiveTab] = useState("active");

    const { tasks, fetchTasksDetails } = useTasksDetails();
    const { employees, setEmployees, fetchEmployees } = useEmployeesDetails();

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

    const handleOnClickActiveTab = () => {
        setActiveTab("active");
    }

    const handleOnClickInActiveTab = () => {
        setActiveTab("inactive")
    }

    return { tasks, activeTab, employees, inactiveEmp, setInactiveEmp, setEmployees, fetchEmployees, fetchTasksDetails, fetchInactiveEmployees, refreshEmployeesData, handleOnClickActiveTab, handleOnClickInActiveTab };

}

export default useAdminEmployeeManager;