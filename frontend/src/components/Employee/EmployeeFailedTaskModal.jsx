import useEmployeeFailedTaskModal from "../../hooks/EmployeeHooks/useEmployeeFailedTaskModal";

const EmployeeFailedTaskModal = ({ taskId, onClose, onSuccess }) => {

    const { reason, setReason, loading, wordCount, lineCount, isValid, handleReject } = useEmployeeFailedTaskModal({ taskId, onClose, onSuccess });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">

            <div className="w-full max-w-xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden">

                <div className="px-6 py-3 border-b border-[#FFDAB3]/30 flex items-center justify-between">
                    <h2 className="font-bold text-[#FFDAB3] text-lg uppercase tracking-wide"> Reason for Rejection </h2>

                    <button onClick={onClose} className="text-[#FFDAB3] text-2xl hover:text-red-400 transition-colors"> ✕ </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm uppercase text-[#FFDAB3]/80 mb-2 font-medium"> Explain the rejection </label>

                        <textarea rows={5} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Explain why this task is being rejected..." className="w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none resize-none focus:border-[#FFDAB3]" />
                    </div>

                    <div className="flex justify-between text-xs text-[#FFDAB3]/60">
                        <span>Minimum 15 words or 2 lines</span>
                        <span>{wordCount} words • {lineCount} lines</span>
                    </div>
                </div>

                <div className="px-6 py-3 border-t border-[#FFDAB3]/30 flex justify-end gap-4 text-sm">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase hover:bg-[#FFDAB3]/10 transition"
                    > Cancel </button>

                    <button disabled={!isValid || loading} onClick={handleReject} className={`px-6 py-2 rounded-lg font-bold uppercase transition ${isValid
                        ? "bg-[#FFDAB3] text-[#1B211A] hover:brightness-110 active:scale-95"
                        : "bg-[#2A2A2A] text-[#777] cursor-not-allowed"
                        }`}>
                        {loading ? "Rejecting..." : "Reject"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeFailedTaskModal;