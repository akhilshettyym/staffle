import { useState } from "react";
import { reactivateEmployee } from "../../api/employee";
import toast from "react-hot-toast";

const useAdminReactivateEmployee = ({ empId }) => {

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

    return { loading, showConfirm, setShowConfirm, onHandleReactivate };
}

export default useAdminReactivateEmployee;