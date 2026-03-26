import { useState } from "react";
import toast from "react-hot-toast";
import { getTaskDetails } from "../../api/tasks";
import { useDispatch, useSelector } from "react-redux";
import { createTaskSuccess, setAllTasks } from "../../slices/taskSlice";
import useEmployeesDetails from "../../utils/useEmployeesDetails";
import { createTask } from "../../api/admin";

const useAdminCreateTaskForm = () => {

    const dispatch = useDispatch();

    const [dueDate, setDueDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [creationDate] = useState(new Date());

    const { employees, fetchEmployees } = useEmployeesDetails();

    const tasks = useSelector((state) => state.tasks.tasks);

    const fetchTasksDetails = async () => {
        try {
            const response = await getTaskDetails();

            if (response?.success) {
                dispatch(setAllTasks(response.tasks || []));
            } else {
                toast.error(response?.message || "Failed to load tasks");
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
            toast.error("Could not fetch tasks");
        }
    };

    const handleOnChange = (date) => {
        setDueDate(date);
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            const formData = new FormData(e.target);

            const title = formData.get("title")?.trim();
            const category = formData.get("category")?.trim();
            const description = formData.get("description")?.trim();
            const assignedTo = formData.get("assignedTo")?.trim();
            const priority = formData.get("priority")?.trim();

            if (!title || !category || !description || !assignedTo || !dueDate || !priority) {
                throw new Error("Please fill all required fields");
            }

            const payload = {
                title,
                category,
                description,
                assignedTo,
                dueDate: dueDate.toISOString(),
                priority
            };

            const response = await createTask(payload);

            if (!response?.success) {
                throw new Error(response?.message || "Could not create task");
            }

            dispatch(createTaskSuccess(response.task));

            toast.success(response.message || "Task created successfully");

            e.target.reset();
            setDueDate(null);

        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return { tasks, employees, dueDate, loading, creationDate, fetchTasksDetails, fetchEmployees, handleOnChange, handleCreateTask };
};

export default useAdminCreateTaskForm;