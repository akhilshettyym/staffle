import { deactivateEmployee } from "../../api/employee";
import { useState, ConfirmModal, toast } from "../../constants/imports";

const RemoveEmp = ({ empId }) => {

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onHandleRemove = async () => {
        if (loading) return;
        setLoading(true);

        try {

            if (!empId) {
                throw new Error("Cannot remove employee: missing empId");
            }

            const response = await deactivateEmployee({ empId });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to delete employee");
            }

            toast.success("Employee removed successfully");
            setShowConfirm(false);

        } catch (error) {

            let msg = "Something went wrong while removing employee";

            if (error.response?.data?.message) {
                msg = error.response.data.message;
            }
            else if (error.message) {
                msg = error.message;
            }

            console.error("Employee removal failed:", error);
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <button onClick={() => setShowConfirm(true)} className="py-1 px-4 text-sm rounded-md bg-red-500 border font-semibold border-red-600 text-[#FFDAB3] hover:bg-red-600 transition"> Remove </button>

            <ConfirmModal isOpen={showConfirm} title="Remove Employee" disabled={loading} message="Are you sure you want to Remove this Employee ? This action cannot be undone." onCancel={() => !loading && setShowConfirm(false)} onConfirm={onHandleRemove} btnTitle={loading ? "Removing..." : "Remove"} />
        </>
    );
};
export default RemoveEmp;