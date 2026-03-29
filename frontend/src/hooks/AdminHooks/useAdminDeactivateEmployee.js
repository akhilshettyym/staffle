import { useState } from "react";
import toast from "react-hot-toast";
import { deactivateEmployee } from "../../api/admin";

const useAdminDeactivateEmployee = ({ empId, onClose, refreshEmployees }) => {

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onHandleRemove = async () => {
        if (loading) return;
        setLoading(true);

        try {

            if (!empId) {
                throw new Error("Cannot deactivate employee: missing empId");
            }

            const response = await deactivateEmployee({ empId });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to deactivate employee");
            }

            toast.success("Employee deactivated successfully");
            await refreshEmployees();
            onClose?.();
            setShowConfirm(false);

        } catch (error) {

            let msg = "Something went wrong while deactivating employee";

            if (error.response?.data?.message) {
                msg = error.response.data.message;
            }
            else if (error.message) {
                msg = error.message;
            }

            console.error("Employee deactivation failed:", error);
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    }

    const handleOnClickShowConfirm = () => {
        setShowConfirm(true);
    }

    const handleOnCancel = () => {
        !loading && setShowConfirm(false);
    }

    return { loading, showConfirm, onHandleRemove, handleOnClickShowConfirm, handleOnCancel };
}

export default useAdminDeactivateEmployee;