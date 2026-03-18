import { ConfirmModal } from "../../constants/imports";
import useAdminDeleteTask from "../../hooks/adminHooks/useAdminDeleteTask";

const AdminRemoveTask = ({ taskId }) => {

    const { loading, showConfirm, setShowConfirm, handleDeleteTask } = useAdminDeleteTask({ taskId });

    return (
        <>
            <button onClick={() => setShowConfirm(true)} className="py-2 px-5 text-xs rounded-md bg-red-500 border font-semibold border-red-600 text-[#FFDAB3] hover:bg-red-600 transition"> Delete </button>

            <ConfirmModal isOpen={showConfirm} title="Delete Task" disabled={loading} message="Are you sure you want to delete this task? This action cannot be undone." onCancel={() => !loading && setShowConfirm(false)} onConfirm={handleDeleteTask} btnTitle={loading ? "Deleting..." : "Delete"} confirmBtnClass="bg-red-500 border-red-600 hover:bg-red-600" />
        </>
    );
};

export default AdminRemoveTask;