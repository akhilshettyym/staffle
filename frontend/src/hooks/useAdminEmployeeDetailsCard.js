import { useState } from "react";
import { getOrganizationUsers } from "../api/employee";
import toast from "react-hot-toast";
import { getTaskDetails } from "../api/tasks";

const useAdminEmployeeDetailsCard = () => {

    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
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
    };

    const fetchTasksDetails = async () => {
        try {
            const response = await getTaskDetails();
            if (response?.success) {
                setTasks(response.tasks || []);
            } else {
                toast.error(response?.message || "Failed to load tasks");
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
            toast.error("Could not fetch tasks");
        }
    };

    return { tasks, employees, fetchEmployees, fetchTasksDetails };
}

export default useAdminEmployeeDetailsCard;