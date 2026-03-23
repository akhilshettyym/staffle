import { useEffect } from "react";
import { PriorityTag, DateConversion, BiSolidError } from "../../constants/imports";
import CustomTooltip from "../Basics/CustomTooltip";
import AdminRemoveTask from "./AdminRemoveTask";
import AdminTaskDetailsModal from "./AdminTaskDetailsModal";

const AdminTaskStatusAllTasks = ({ status, allCreatedTasks, selectedTask, setSelectedTask, fetchTasksDetails, fetchEmployees, getEmployeeName }) => {

    useEffect(() => {
        fetchTasksDetails();
        fetchEmployees();
    }, []);

    return (
        <div>
            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Created Tasks </h1>
                <CustomTooltip id="task-status-alltasks-tooltip" message="You can delete any task, regardless of status. The task will be permanently deleted and cannot be recovered." place="right" />
            </div>

            {allCreatedTasks.length === 0 ? (
                <div className="bg-[#1B211A] rounded-2xl p-10 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                    <p className="text-center text-[#F8F8F2]/60"> No tasks created yet. </p>
                </div>
            ) : (
                <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allCreatedTasks.map((task, index) => (
                            <div key={task.id} className="bg-[#FFDAB3]/10 rounded-2xl border border-[#FFDAB3]/30 hover:border-[#FFDAB3]/50 transition flex flex-col">
                                <div className="px-2 py-2 border-b border-[#FFDAB3]/20">
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/25">
                                        <h3 className="text-[#FFDAB3] font-medium uppercase line-clamp-2"> {task.title} </h3>
                                        <PriorityTag priorityMsg={task.priority} />
                                    </div>
                                </div>

                                <div className="px-4 py-3 flex flex-col gap-2 text-sm text-[#F8F8F2]/80 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="uppercase font-medium">Status</span>
                                        <span className={`px-4 py-1 rounded-full font-bold uppercase border text-xs ${{
                                            new: "bg-amber-100 text-amber-700 border-amber-200",
                                            inprogress: "bg-blue-100 text-blue-700 border-blue-200",
                                            completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
                                            failed: "bg-red-100 text-red-700 border-red-200",
                                        }[status] ||
                                            "bg-gray-100 text-gray-600 border-gray-200"
                                            }`}> {task.status}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="font-medium"> Category : </span>
                                        <span className="text-[#FFDAB3]">{task.category}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span> Created : <span className="font-medium text-[#FFDAB3] ml-1"><DateConversion convertDate={task?.createdAt} /></span></span>
                                        <span> Due : <span className="font-medium text-[#FFDAB3] ml-1"><DateConversion convertDate={task?.dueDate} /></span></span>
                                    </div>

                                    <div className="text-sm">
                                        <span className="font-medium"> Description :</span>
                                        <span className="ml-2 text-[#FFDAB3]"> {task.description || "No description provided"} </span>
                                    </div>

                                    <div className="text-xs text-[#F8F8F2]/70 flex items-center justify-between">
                                        <div> Assigned to :
                                            <span className="ml-2 uppercase text-[#FFDAB3] font-semibold">
                                                {getEmployeeName(task.assignedTo)}
                                            </span>
                                        </div>

                                        {task?.failureReason && task.failureReason.trim() !== "" && (
                                            <div className="relative group">
                                                <span className="text-red-500 cursor-help transition-colors hover:text-red-400">
                                                    <BiSolidError size={20} />
                                                </span>

                                                <div className="absolute z-20 right-0 bottom-full mb-2 hidden group-hover:block w-80 max-w-[90vw] px-3 py-2.5 bg-[#1B1F1A] text-[#F8F8F2] text-xs rounded-lg border-2 border-red-500/40 shadow-xl whitespace-pre-wrap wrap-break-word">
                                                    <div className="font-semibold text-red-400 mb-1 flex items-center gap-1.5">
                                                        <BiSolidError size={18} /> Failure Reason
                                                    </div>
                                                    <div className="text-[#FFDAB3]/95 leading-relaxed"> {task.failureReason} </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="px-4 py-2 border-t border-[#FFDAB3]/20 bg-[#1B211A] flex justify-between items-center rounded-b-2xl">
                                    <span className="text-xs text-[#F8F8F2]/60"> Task ID : {index + 1 || ""} </span>

                                    <div className="flex items-center gap-3">
                                        <button onClick={() => setSelectedTask(task)} className="py-2 px-5 text-xs rounded-md border font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"> View </button>

                                        <AdminRemoveTask taskId={task.id || task._id} />
                                    </div>

                                </div>
                            </div>
                        ))}

                        {selectedTask && (
                            <AdminTaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} getEmployeeName={getEmployeeName} fetchTasksDetails={fetchTasksDetails} />
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminTaskStatusAllTasks;