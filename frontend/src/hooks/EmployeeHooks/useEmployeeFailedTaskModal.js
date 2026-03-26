import { useState } from "react";
import toast from "react-hot-toast";
import { requestRejection } from "../../api/employee";

const useEmployeeFailedTaskModal = ({ taskId, onClose, onSuccess }) => {

    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const wordCount = reason.trim().split(/\s+/).filter(Boolean).length;
    const lineCount = reason.split("\n").filter(Boolean).length;

    const isValid =
        /^[a-zA-Z\s\n.,'-]+$/.test(reason) &&
        (wordCount >= 15 || lineCount >= 2);

    const handleReject = async () => {
        if (!isValid) return;

        try {
            setLoading(true);

            const response = await requestRejection({ taskId, reason });

            toast.success(response?.message || "Rejection request sent successfully");

            onSuccess?.(reason);
            onClose();

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to request rejection");

        } finally {
            setLoading(false);
        }
    };

    return { reason, setReason, loading, wordCount, lineCount, isValid, handleReject };
}

export default useEmployeeFailedTaskModal;