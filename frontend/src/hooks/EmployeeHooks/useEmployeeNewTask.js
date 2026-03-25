import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getOrganizationUsers } from "../../api/employee";
import toast from "react-hot-toast";
import { getTaskDetails } from "../../api/tasks";

const useEmployeeNewTask = () => {

    const [activeTab, setActiveTab] = useState("new");
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    const user = useSelector((state) => state.auth.user);

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

    const getMyTasks = useCallback((status) => {
        if (!user?._id) return [];

        const myId = user._id;

        return tasks.filter(task => {
            const isMine = task.assignedTo === myId;
            return status ? isMine && task.status === status : isMine;
        });
    }, [tasks, user?._id]);

    const employeeTasks = useMemo(
        () => getMyTasks(),
        [getMyTasks]
    );

    const employeeNewTasks = useMemo(
        () => getMyTasks("NEW"),
        [getMyTasks]
    );

    const employeeRequestedRejectionTasks = useMemo(
        () => getMyTasks("REJECTION_REQUESTED"),
        [getMyTasks]
    );

    const employeeRejectedRequests = useMemo(() => {
        if (!user?._id) return [];

        return tasks.filter(task => {
            return (
                task.assignedTo === user._id &&
                task.status === "NEW" &&
                task?.rejection?.status === "REJECTED"
            );
        });
    }, [tasks, user?._id]);

    const handleTaskStatusChange = useCallback((taskId, status, reason) => {
        setTasks(prev =>
            prev.map(t =>
                (t._id ?? t.id) === taskId
                    ? { ...t, status, failureReason: reason || t.failureReason }
                    : t
            )
        );
    }, []);

    return { activeTab, setActiveTab, fetchEmployees, fetchTasksDetails, employeeTasks, employeeNewTasks, employeeRequestedRejectionTasks, employeeRejectedRequests, handleTaskStatusChange };
}

export default useEmployeeNewTask;