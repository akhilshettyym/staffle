import { useSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import useTasksDetails from "../../utils/useTasksDetails";

const useEmployeeComFailedTasks = () => {

    const user = useSelector((state) => state.auth.user);

    const [activeTab, setActiveTab] = useState("completed-tasks");

    const { tasks, fetchTasksDetails } = useTasksDetails();

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