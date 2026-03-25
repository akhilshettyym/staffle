import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useTasksDetails from "../../utils/useTasksDetails";

const useEmployeeTaskStatus = () => {

    const user = useSelector((state) => state.auth.user);

    const [selectedTask, setSelectedTask] = useState(null);

    const { tasks, fetchTasksDetails } = useTasksDetails();

    const assignedToUser = `${user?.firstName} ${user?.lastName}`;

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

    return { selectedTask, setSelectedTask, assignedToUser, fetchTasksDetails, employeeTasks };
}

export default useEmployeeTaskStatus;