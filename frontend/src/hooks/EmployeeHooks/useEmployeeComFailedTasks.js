import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getTaskDetails } from "../../api/tasks";
import { useCallback, useMemo, useState } from "react";

const useEmployeeComFailedTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState("completed-tasks");

    const user = useSelector((state) => state.auth.user);

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

    const employeeCompletedTasks = useMemo(
        () => getMyTasks("COMPLETED"),
        [getMyTasks]
    );

    const employeeFailedTasks = useMemo(
        () => getMyTasks("FAILED"),
        [getMyTasks]
    );

    return { activeTab, setActiveTab, fetchTasksDetails, employeeTasks, employeeCompletedTasks, employeeFailedTasks };
};

export default useEmployeeComFailedTasks;