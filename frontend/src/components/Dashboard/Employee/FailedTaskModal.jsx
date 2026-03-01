import { useState } from "../../../constants/imports";

const FailedTaskModal = ({ onClose, onSave }) => {
    const [reason, setReason] = useState("");

    const wordCount = reason.trim().split(/\s+/).filter(Boolean).length;
    const lineCount = reason.split("\n").filter(Boolean).length;

    const isValid =
        /^[a-zA-Z\s\n.,'-]+$/.test(reason) &&
        (wordCount >= 15 || lineCount >= 2);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="w-full max-w-xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 p-6">

                <h2 className="text-xl font-bold uppercase text-[#FFDAB3] text-center"> Reason for Failure </h2>

                <textarea rows={6} value={reason} onChange={(e) => setReason(e.target.value)} className="mt-4 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none" placeholder="Explain why this task failed..." />

                <p className="mt-2 text-xs text-[#FFDAB3]/60">
                    Minimum 15 words or 2 lines. Only meaningful text allowed.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <button onClick={onClose} className="px-8 py-2 rounded-full border border-[#FFDAB3]/40 text-[#FFDAB3]"> Cancel </button>

                    <button disabled={!isValid} onClick={() => onSave(reason)} className={`px-8 py-2 rounded-full font-bold uppercase transition
             ${isValid
                            ? "bg-[#FFDAB3] text-[#1B211A]"
                            : "bg-[#2A2A2A] text-[#777] cursor-not-allowed"
                        }`}> Save </button>
                </div>
            </div>
        </div>
    );
};

export default FailedTaskModal;