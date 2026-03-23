import { useEffect, useState } from "react";
import { getOrganizationUsers } from "../../api/employee";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateTask } from "../../api/tasks";
import { updateTaskSuccess } from "../../slices/taskSlice";

const useAdminEditTaskModal = ({ task, onClose, onTaskUpdated }) => {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        priority: "Medium",
        assignedTo: "",
        dueDate: null,
    });

    useEffect(() => {
        if (!task) return;

        setFormData({
            title: task?.title || "",
            category: task?.category || "",
            description: task?.description || "",
            priority: task?.priority || "Medium",
            assignedTo: task?.assignedTo || "",
            dueDate: task?.dueDate ? new Date(task.dueDate) : null,
        });
    }, [task]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({ ...prev, dueDate: date }));
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            if (!formData.title?.trim()) throw new Error("Task title is required");
            if (!formData.category?.trim()) throw new Error("Category is required");
            if (!formData.priority) throw new Error("Priority is required");

            if (formData.dueDate && formData.dueDate < new Date()) {
                throw new Error("Please select a valid date.");
            }

            const payload = {
                title: formData.title.trim(),
                category: formData.category.trim(),
                description: formData.description?.trim() || "",
                assignedTo: formData.assignedTo || null,
                priority: formData.priority,
                dueDate: formData.dueDate
                    ? formData.dueDate.toISOString()
                    : null,
            };

            const taskId = task?._id || task?.id;
            if (!taskId) throw new Error("Cannot update task: missing task ID");

            const response = await updateTask({ taskId, ...payload });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to update task");
            }

            const updatedTask = response.task || response.updatedTask || { ...task, ...payload };

            dispatch(updateTaskSuccess(updatedTask));

            toast.success("Task updated successfully");

            onTaskUpdated?.(updatedTask);
            onClose();

        } catch (error) {
            const msg = error?.response?.data?.message || error.message || "Something went wrong while updating task";
            toast.error(msg);
            
        } finally {
            setLoading(false);
        }
    };

    return { employees, loading, formData, fetchEmployees, handleChange, handleDateChange, handleUpdateTask };
}

export default useAdminEditTaskModal;