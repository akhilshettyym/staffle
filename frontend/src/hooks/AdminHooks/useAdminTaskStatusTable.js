import { useState } from "react";
import { getTaskDetails } from "../../api/tasks";
import toast from "react-hot-toast";
import { getOrganizationUsers } from "../../api/employee";

const useAdminTaskStatusTable = () => {

    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const status = tasks?.status?.toLowerCase();
    const failedTasks = tasks?.filter((task) => task?.status === "FAILED") || [];
    const allCreatedTasks = tasks?.filter((task) => task?.status !== "FAILED" && task?.status !== "REJECTION_REQUESTED") || [];
    const requestedRejectionTasks = tasks?.filter((task) => task?.status === "REJECTION_REQUESTED") || [];

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

    const getEmployeeName = (id) => {
        const emp = employees.find(
            e => (e._id || e.id) === id
        );

        return emp
            ? `${emp.firstName} ${emp.lastName}`
            : "Unassigned";
    };


    const refreshEmployeesData = async () => {
        await Promise.all([
            fetchTasksDetails(),
            fetchEmployees(),
            getEmployeeName()
        ]);
    };

    return { tasks, status, failedTasks, editingTask, allCreatedTasks, selectedTask, requestedRejectionTasks, setSelectedTask, setEditingTask, setTasks, fetchTasksDetails, fetchEmployees, getEmployeeName, refreshEmployeesData };
}

export default useAdminTaskStatusTable;