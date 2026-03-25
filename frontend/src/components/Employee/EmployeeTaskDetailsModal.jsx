import { DateConversion, PriorityTag } from "../../constants/imports";
import useEmployeeTaskDetailsModal from "../../hooks/EmployeeHooks/useEmployeeTaskDetailsModal";

const EmployeeTaskDetailsModal = ({ task, onClose, getEmployeeName }) => {

    const { failureReason, failedAt, rejectionReason, rejectionRequestedAt, rejectionStatus, status, statusStyles } = useEmployeeTaskDetailsModal({ task });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="w-[92%] max-w-3xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/30 shadow-2xl">

                <div className="flex justify-between items-start px-6 py-5 border-b border-[#FFDAB3]/25">
                    <div>
                        <h2 className="text-2xl font-bold text-[#FFDAB3] uppercase tracking-wide"> {task.title} </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex justify-between items-center">
                            <span className={`mr-4 px-4 py-1 rounded-full border text-xs font-bold uppercase 
                            ${statusStyles[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                {task.status?.replace("_", " ")}
                            </span>
                            <PriorityTag priorityMsg={task.priority} />
                        </div>

                        <button onClick={onClose} className="text-[#FFDAB3] ml-3 hover:text-red-400 text-xl font-bold transition" > ✕ </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6 text-md">
                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1"> Category </p>
                            <p className="text-[#FFDAB3] font-medium">
                                {task.category}
                            </p>
                        </div>

                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1"> Assigned To </p>
                            <p className="text-[#FFDAB3] font-medium uppercase">
                                {getEmployeeName}
                            </p>
                        </div>

                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1"> Created </p>
                            <p className="text-[#FFDAB3] font-medium">
                                <DateConversion convertDate={task.createdAt} />
                            </p>
                        </div>

                        <div>
                            <p className="text-[#F8F8F2]/60 text-sm uppercase mb-1"> Due Date </p>
                            <p className="text-[#FFDAB3] font-medium">
                                <DateConversion convertDate={task.dueDate} />
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-[#F8F8F2]/60 text-sm uppercase mb-2"> Description </p>
                        <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-4 text-[#FFDAB3] text-sm leading-relaxed">
                            {task.description || "No description provided"}
                        </div>
                    </div>

                    {failureReason && (
                        <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-4 space-y-2">
                            <p className="text-red-400 font-semibold uppercase text-sm"> Task Failure </p>
                            <p className="text-[#FFDAB3] text-sm"> {failureReason} </p>

                            {failedAt && (
                                <p className="text-xs text-red-300"> Failed At :
                                    <span className="ml-1">
                                        <DateConversion convertDate={failedAt} />
                                    </span>
                                </p>
                            )}
                        </div>
                    )}

                    {rejectionReason && (
                        <div className="bg-orange-500/10 border border-orange-500/40 rounded-lg p-4 space-y-2">
                            <p className="text-orange-400 font-semibold uppercase text-sm"> Rejection Requested </p>
                            <p className="text-[#FFDAB3] text-sm"> {rejectionReason} </p>

                            <div className="flex justify-between items-center">
                                {rejectionRequestedAt && (
                                    <p className="text-xs text-orange-300"> Requested At :
                                        <span className="ml-1">
                                            <DateConversion convertDate={rejectionRequestedAt} />
                                        </span>
                                    </p>
                                )}

                                {rejectionStatus && (
                                    <span className="text-xs px-3 py-1 rounded-full border border-orange-400 text-orange-300 uppercase">
                                        {rejectionStatus}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeTaskDetailsModal;