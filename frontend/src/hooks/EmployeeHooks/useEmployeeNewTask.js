import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useTasksDetails from "../../utils/useTasksDetails";
import useEmployeesDetails from "../../utils/useEmployeesDetails";

const useEmployeeNewTask = () => {

    const [activeTab, setActiveTab] = useState("new");
    const user = useSelector((state) => state.auth.user);

    const { tasks, setTasks, fetchTasksDetails } = useTasksDetails();
    const { fetchEmployees } = useEmployeesDetails();

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