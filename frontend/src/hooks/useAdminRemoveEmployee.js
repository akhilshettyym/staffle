import { useState } from "react";
import { deactivateEmployee } from "../api/employee";
import toast from "react-hot-toast";

const useAdminRemoveEmployee = () => {

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

    return { loading, showConfirm, setShowConfirm, onHandleRemove };
}

export default useAdminRemoveEmployee;