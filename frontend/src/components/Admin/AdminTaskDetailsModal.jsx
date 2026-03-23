import { useState } from "react";
import { DateConversion, PriorityTag } from "../../constants/imports";
import AdminRejectRejectionModal from "./AdminRejectRejectionModal";

const AdminTaskDetailsModal = ({ task, onClose, getEmployeeName }) => {
    if (!task) return null;

    const [showRejectModal, setShowRejectModal] = useState(false);

    const failureReason = task?.taskLifeCycle?.failure?.reason;
    const failedAt = task?.taskLifeCycle?.failure?.failedAt;
    const isRequestRejection = task.status === "REJECTION_REQUESTED";

    const status = task?.status?.toLowerCase();

    const statusStyles = {
        new: "bg-amber-100 text-amber-700 border-amber-200",
        inprogress: "bg-blue-100 text-blue-700 border-blue-200",
        completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
        failed: "bg-red-100 text-red-700 border-red-200",
        rejection_requested: "bg-red-200 text-red-800 border-red-400",
    };

    const handleOpenRejectModal = () => setShowRejectModal(true);
    const handleCloseRejectModal = () => setShowRejectModal(false);

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
                <div onClick={(e) => e.stopPropagation()} className="w-[92%] max-w-3xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/30 shadow-2xl">

                    <div className="flex justify-between items-start px-6 py-5 border-b border-[#FFDAB3]/25">
                        <div>
                            <h2 className="text-2xl font-bold text-[#FFDAB3] uppercase tracking-wide">{task.title}</h2>
                            <p className="text-xs text-[#F8F8F2]/50 mt-1">Task ID: {task._id || task.id}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex justify-between items-center">
                                <span
                                    className={`mr-4 px-4 py-1 rounded-full border text-xs font-bold uppercase ${statusStyles[status.replace(/\s/g, "_")] || "bg-gray-100 text-gray-600 border-gray-200"
                                        }`}
                                > {task.status}
                                </span>
                                <PriorityTag priorityMsg={task.priority} />
                            </div>
                            <button onClick={onClose} className="text-[#FFDAB3] ml-3 hover:text-red-400 text-xl font-bold transition"> ✕ </button>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6 text-md">
                            <div>
                                <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1">Category</p>
                                <p className="text-[#FFDAB3] font-medium">{task.category}</p>
                            </div>

                            <div>
                                <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1">Assigned To</p>
                                <p className="text-[#FFDAB3] font-medium uppercase">{getEmployeeName(task.assignedTo)}</p>
                            </div>

                            <div>
                                <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1">Created</p>
                                <p className="text-[#FFDAB3] font-medium"><DateConversion convertDate={task.createdAt} /></p>
                            </div>

                            <div>
                                <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1">Due Date</p>
                                <p className="text-[#FFDAB3] font-medium"><DateConversion convertDate={task.dueDate} /></p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-2">Description</p>
                            <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-4 text-[#FFDAB3] text-sm leading-relaxed">
                                {task.description || "No description provided"}
                            </div>
                        </div>

                        {isRequestRejection && (
                            <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-4 space-y-3">
                                <p className="text-red-400 font-semibold uppercase text-sm">Employee Rejection Reason</p>
                                <p className="text-[#FFDAB3] text-sm">{task.rejection?.reason || "No reason provided"}</p>

                                <div className="flex gap-4 mt-3 justify-end">
                                    <button className="px-4 py-2 rounded-md border border-green-500 text-green-400 text-sm font-semibold uppercase hover:bg-green-500 hover:text-white transition"> Approve </button>

                                    <button onClick={handleOpenRejectModal} className="px-4 py-2 rounded-md border border-red-500 text-red-400 text-sm font-semibold uppercase hover:bg-red-500 hover:text-white transition"> Reject </button>
                                </div>
                            </div>
                        )}

                        {failureReason && (
                            <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-4 space-y-2">
                                <p className="text-red-400 font-semibold uppercase text-sm">Task Failure</p>
                                <p className="text-[#FFDAB3] text-sm">{failureReason}</p>

                                {failedAt && (
                                    <p className="text-xs text-red-300">
                                        Failed At: <span className="ml-1"><DateConversion convertDate={failedAt} /></span>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showRejectModal && (
                <AdminRejectRejectionModal task={task} onClose={handleCloseRejectModal} onSuccess={() => { }} />
            )}
        </>
    );
};

export default AdminTaskDetailsModal;