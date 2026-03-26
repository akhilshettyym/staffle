import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { acceptTask, markAsCompleted } from "../../api/employee";

const useEmployeeTaskCard = ({ task, onTaskStatusChange }) => {

    const user = useSelector((state) => state.auth.user);

    const [loading, setLoading] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showFailModal, setShowFailModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);

    const taskId = task?._id ?? task?.id;
    const assignedToUser = `${user.firstName} ${user.lastName}`;

    const statusStyles = {
        NEW: "bg-amber-100 text-amber-700 border-amber-200",
        IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
        COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
        FAILED: "bg-red-100 text-red-700 border-red-200"
    };

    const handleAcceptTask = async () => {
        if (loading) return;
        setLoading(true);

        try {
            if (!taskId) throw new Error("No task ID");

            const response = await acceptTask(taskId);

            if (!response?.success) {
                throw new Error(response?.message || "Accept failed");
            }

            toast.success("Task accepted");

            onTaskStatusChange?.(taskId, "IN_PROGRESS");

        } catch (error) {
            const msg = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsCompleted = async () => {
        if (loading) return;
        setLoading(true);

        try {
            if (!taskId) throw new Error("No task ID");

            const response = await markAsCompleted(taskId);

            if (!response?.success) {
                throw new Error(response?.message || "Complete failed");
            }

            toast.success("Task marked as completed");

            onTaskStatusChange?.(taskId, "COMPLETED");

        } catch (error) {
            const msg = error?.response?.data?.message || error.message || "Something went wrong while marking task as completed";
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    const handleRejectTask = (reason) => {
        onTaskStatusChange?.(taskId, "FAILED", reason);
        setShowFailModal(false);
    };

    return { assignedToUser, showFailModal, setShowFailModal, selectedTask, setSelectedTask, showCompleteModal, setShowCompleteModal, showAcceptModal, setShowAcceptModal, taskId, statusStyles, handleAcceptTask, handleMarkAsCompleted, handleRejectTask };
}

export default useEmployeeTaskCard;