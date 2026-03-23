import { useState } from "react";
import axios from "axios";

const AdminRejectRejectionModal = ({ task, onClose, onSuccess }) => {

    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const wordCount = reason.trim().split(/\s+/).filter(Boolean).length;
    const lineCount = reason.split("\n").filter(Boolean).length;
    const isValid = /^[a-zA-Z\s\n.,'-]+$/.test(reason) && (wordCount >= 15 || lineCount >= 2);

    const handleSubmit = async () => {

        if (!isValid) return;
        try {
            setLoading(true);
            await axios.patch(`/api/admin/review-task-rejection/${task.id}`, {
                decision: "REJECTED",
                adminReason: reason,
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Error rejecting request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6">
            <div className="w-full max-w-md bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 shadow-lg flex flex-col overflow-hidden">

                <div className="flex justify-between items-center px-6 py-4 border-b border-[#FFDAB3]/30">
                    <h2 className="text-lg font-bold uppercase text-[#FFDAB3]"> Reject Request </h2>
                    <button onClick={onClose} className="text-[#FFDAB3] text-2xl hover:text-red-400 transition"> ✕ </button>
                </div>

                <div className="px-6 py-4 space-y-4">
                    <p className="text-sm text-[#FFDAB3]/90">
                        Please provide a reason for rejecting the employee's task rejection request:
                    </p>
                    <textarea rows={5} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain why this task rejection request is being rejected..."
                        className="w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none resize-none focus:border-[#FFDAB3]" />

                    <div className="flex justify-between text-xs text-[#FFDAB3]/60">
                        <span>Minimum 15 words or 2 lines</span>
                        <span>{wordCount} words • {lineCount} lines</span>
                    </div>
                </div>

                <div className="flex justify-end gap-4 px-6 py-3 border-t border-[#FFDAB3]/30">
                    <button onClick={onClose} className="px-5 py-2 rounded-lg border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase hover:bg-[#FFDAB3]/10 transition"> Cancel </button>

                    <button disabled={!isValid || loading} onClick={handleSubmit} className={`px-5 py-2 rounded-lg font-bold uppercase transition ${isValid
                        ? "bg-[#FFDAB3] text-[#1B211A] hover:brightness-110"
                        : "bg-[#2A2A2A] text-[#777] cursor-not-allowed"
                        }`}>
                        {loading ? "Submitting..." : "Reject Request"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminRejectRejectionModal;