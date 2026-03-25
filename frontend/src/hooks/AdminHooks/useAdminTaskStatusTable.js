import { useState } from "react";
import useTasksDetails from "../../utils/useTasksDetails";
import useEmployeesDetails from "../../utils/useEmployeesDetails";

const useAdminTaskStatusTable = () => {

    const [editingTask, setEditingTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activeTab, setActiveTab] = useState("created-tasks");

    const { tasks, setTasks, fetchTasksDetails } = useTasksDetails();
    const { employees, fetchEmployees } = useEmployeesDetails();

    const status = tasks?.status?.toLowerCase();

    const failedTasks =
        tasks?.filter((task) => task?.status === "FAILED") || [];

    const allCreatedTasks =
        tasks?.filter((task) => task) || [];

    const inProgressTasks =
        tasks?.filter((task) => task?.status === "IN_PROGRESS") || [];

    const completedTasks =
        tasks?.filter((task) => task?.status === "COMPLETED") || [];

    const requestedRejectionTasks =
        tasks?.filter((task) => task?.status === "REJECTION_REQUESTED") || [];

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

    return { tasks, status, failedTasks, editingTask, allCreatedTasks, inProgressTasks, completedTasks, selectedTask, requestedRejectionTasks, activeTab, setActiveTab, setSelectedTask, setEditingTask, setTasks, fetchTasksDetails, fetchEmployees, getEmployeeName, refreshEmployeesData };
}

export default useAdminTaskStatusTable;