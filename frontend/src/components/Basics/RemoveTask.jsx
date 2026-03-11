import { deleteTask } from "../../api/tasks";
import { useState, toast, ConfirmModal } from "../../constants/imports";

const RemoveTask = ({ taskId }) => {

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

    return (
        <>
            <button onClick={() => setShowConfirm(true)} className="py-1 px-4 text-sm rounded-md bg-red-500 border font-semibold border-red-600 text-[#FFDAB3] hover:bg-red-600 transition"> Delete </button>

            <ConfirmModal isOpen={showConfirm} title="Delete Task" disabled={loading} message="Are you sure you want to delete this task? This action cannot be undone." onCancel={() => !loading && setShowConfirm(false)} onConfirm={handleDeleteTask} btnTitle={loading ? "Deleting..." : "Delete"} />
        </>
    );
};

export default RemoveTask;