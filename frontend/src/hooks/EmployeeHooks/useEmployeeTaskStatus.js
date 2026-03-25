import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getTaskDetails } from "../../api/tasks";
import { getOrganizationUsers } from "../../api/employee";

const useEmployeeTaskStatus = () => {

    const user = useSelector((state) => state.auth.user);

    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const assignedToUser = `${user?.firstName} ${user?.lastName}`

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

    const employeeTasks = useMemo(() => {
        if (!tasks || !user?._id) return [];

        return tasks
            .filter(task => task.assignedTo === user._id)
            .sort((a, b) => {

                if (a.status === "NEW" && b.status !== "NEW") return -1;
                if (a.status !== "NEW" && b.status === "NEW") return 1;

                return new Date(b.createdAt) - new Date(a.createdAt);
            });
    }, [tasks, user?._id]);

    return { selectedTask, setSelectedTask, assignedToUser, fetchEmployees, fetchTasksDetails, employeeTasks };
}

export default useEmployeeTaskStatus;