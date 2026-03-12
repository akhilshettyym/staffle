import { useState } from "react";
import { getTaskDetails } from "../api/tasks";
import toast from "react-hot-toast";

const useTasksTable = () => {

    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

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
    }

    return { fetchTasksDetails, tasks, editingTask, setEditingTask };
};

export default useTasksTable;