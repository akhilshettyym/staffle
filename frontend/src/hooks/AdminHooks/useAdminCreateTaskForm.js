import { useState } from "react";
import { getOrganizationUsers } from "../../api/employee";
import toast from "react-hot-toast";
import { createTask } from "../../api/tasks";

const useAdminCreateTaskForm = () => {

    const [employees, setEmployees] = useState([]);
    const [dueDate, setDueDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [creationDate] = useState(new Date());

    const fetchEmployees = async () => {
        try {
            const response = await getOrganizationUsers();
            if (response?.success) {
                setEmployees(response.users || []);
            } else {
                toast.error(response?.message || "Failed to load employees");
            }
        } catch (error) {
            console.error("Failed to fetch employees:", error);
            toast.error("Could not fetch employees");
        }
    };

    const handleOnChange = (date) => {
        setDueDate(date)
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

            const payload = { title, category, description, assignedTo, dueDate: dueDate.toISOString(), priority };

            const response = await createTask(payload);

            if (!response?.success) {
                throw new Error(response?.message || "Could not create task");
            }

            toast.success(response.message || "Task created successfully");
            e.target.reset();
            setDueDate(null);

        } catch (error) {
            const message =
                error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return { employees, dueDate, loading, creationDate, fetchEmployees, handleOnChange, handleCreateTask };
};

export default useAdminCreateTaskForm;