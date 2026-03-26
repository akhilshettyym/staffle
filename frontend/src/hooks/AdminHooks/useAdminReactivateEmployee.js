import { useState } from "react";
import toast from "react-hot-toast";
import { reactivateEmployee } from "../../api/admin";

const useAdminReactivateEmployee = ({ empId, refreshEmployees }) => {

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onHandleReactivate = async () => {
        if (loading) return;
        setLoading(true);

        try {

            if (!empId) {
                throw new Error("Cannot reactivate employee: missing empId");
            }

            const response = await reactivateEmployee({ empId });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to reactivate employee");
            }

            toast.success("Employee reactivated successfully");
            await refreshEmployees();
            setShowConfirm(false);

        } catch (error) {

            let msg = "Something went wrong while reactivating employee";

            if (error.response?.data?.message) {
                msg = error.response.data.message;
            }
            else if (error.message) {
                msg = error.message;
            }

            console.error("Employee reactivation failed:", error);
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    }

    const handleOnClickReactivate = () => {
        setShowConfirm(true);
    }

    const handleOnCancel = () => {
        !loading && setShowConfirm(false);
    }

    return { loading, showConfirm, onHandleReactivate, handleOnClickReactivate, handleOnCancel };
}

export default useAdminReactivateEmployee;