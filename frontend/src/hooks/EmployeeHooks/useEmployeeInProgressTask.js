import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import useTasksDetails from "../../utils/useTasksDetails";
import useEmployeesDetails from "../../utils/useEmployeesDetails";

const useEmployeeInProgressTask = () => {

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
        [getMyTasks]);

    const employeeInProgressTasks = useMemo(
        () => getMyTasks("IN_PROGRESS"),
        [getMyTasks]);

    const handleTaskStatusChange = useCallback((taskId, status, reason) => {
        setTasks(prev =>
            prev.map(t =>
                (t._id ?? t.id) === taskId
                    ? { ...t, status, failureReason: reason || t.failureReason }
                    : t
            )
        );
    }, []);

    return { fetchEmployees, fetchTasksDetails, employeeTasks, employeeInProgressTasks, handleTaskStatusChange };
}

export default useEmployeeInProgressTask;