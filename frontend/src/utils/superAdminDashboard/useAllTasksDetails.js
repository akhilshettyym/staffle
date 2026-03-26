import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getAlltasksDetails } from "../../api/superadmin";

const useAllTasksDetails = () => {

    const [allTasks, setAllTasks] = useState([]);

    const fetchAllTasks = useCallback(async () => {

        try {
            const response = await getAlltasksDetails();
            setAllTasks(response?.tasks || []);

        } catch (error) {
            console.error("Failed to fetch task details", error);
            toast.error("Could not fetch tasks");
        }
    }, []);

    return { allTasks, setAllTasks, fetchAllTasks };
};

export default useAllTasksDetails;