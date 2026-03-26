import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteTaskSuccess } from "../../slices/taskSlice";
import { deleteTask } from "../../api/admin";

const useAdminDeleteTask = ({ taskId, refreshEmployeesData }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDeleteTask = async () => {

        if (loading) return;
        setLoading(true);

        try {

            if (!taskId) {
                throw new Error("Cannot delete task: missing taskID");
            }

            const response = await deleteTask({ taskId });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to delete task");
            }

            dispatch(deleteTaskSuccess(taskId));
            refreshEmployeesData();

            toast.success("Task deleted successfully");
            setShowConfirm(false);

        } catch (error) {

            let msg = "Something went wrong while deleting the task";

            if (error.response?.data?.message) {
                msg = error.response.data.message;
            }
            else if (error.message) {
                msg = error.message;
            }

            console.error("Task deletion failed:", error);
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    const handleOnClickDelete = () => {
        setShowConfirm(true);
    }

    const handleOnCancel = () => {
        !loading && setShowConfirm(false);
    }

    return { loading, showConfirm, handleDeleteTask, handleOnClickDelete, handleOnCancel };
}

export default useAdminDeleteTask;