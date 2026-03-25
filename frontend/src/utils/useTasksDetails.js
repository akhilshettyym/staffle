import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getTaskDetails } from "../api/tasks";

const useTasksDetails = () => {

    const [tasks, setTasks] = useState([]);

    const fetchTasksDetails = useCallback(async () => {

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
    }, []);

    return { tasks, setTasks, fetchTasksDetails };
};

export default useTasksDetails;