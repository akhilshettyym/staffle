import { DateConversion, PriorityTag } from "../../constants/imports";
import AdminEditTaskModal from "./AdminEditTaskModal";
import { useEffect } from "react";
import CustomTooltip from "../Basics/CustomTooltip";
import useTasksTable from "../../hooks/useTasksTable";

const AdminTasksTable = () => {

    const { fetchTasksDetails, tasks, editingTask, setEditingTask } = useTasksTable();

    useEffect(() => {
        fetchTasksDetails();
    }, []);

    return (
        <div className="pb-10">
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Created Tasks </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="flex items-center gap-2">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Tasks Created </h1>
                <CustomTooltip id="created-tasks-tooltip" message="Review the draft tasks below for accuracy and completeness." place="right" />
            </div>

            <div className="bg-[#1B211A] rounded-2xl p-4 mt-5 border border-[#FFDAB3]/30 shadow-inner">
                <div className="bg-[#FFDAB3]/20 py-3 px-5 flex items-center rounded-2xl mb-3 border border-[#FFDAB3]/10">
                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Title</span>
                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Category</span>
                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Status</span>
                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Created</span>
                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase">Due</span>
                    <span className="w-1/6 text-[#FFDAB3] text-sm font-medium uppercase text-center">Priority</span>
                </div>

                <hr className="my-2 border border-[#FFDAB3]/40" />

                {(!tasks || tasks.length === 0) ? (
                    <div className="text-center py-8 text-[#F8F8F2]/60"> No tasks created yet </div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="bg-[#0F1412] py-3 px-5 flex items-center rounded-2xl mb-3 border border-[#FFDAB3]/20">
                            <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">{task.title}</span>
                            <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">{task.category}</span>
                            <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">{task.status}</span>
                            <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                <DateConversion convertDate={task?.createdAt} />
                            </span>
                            <span className="w-1/6 text-[#FFDAB3] text-sm font-medium capitalize">
                                <DateConversion convertDate={task?.dueDate} />
                            </span>
                            <div className="w-1/6 flex justify-center">
                                <PriorityTag priorityMsg={task?.priority} />
                            </div>

                            <div className="relative inline-block group">
                                <button onClick={() => task.status === "NEW" && setEditingTask(task)} disabled={task.status !== "NEW"} className={`py-1 px-4 text-sm rounded-md border font-semibold transition ${task.status === "NEW"
                                    ? "border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"
                                    : "border-[#555] text-[#777] bg-[#2A2A2A] cursor-not-allowed opacity-60"
                                    }`}> Edit </button>

                                {task.status !== "NEW" && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 bg-[#1B211A] text-[#FFDAB3]/90 text-xs px-3 py-1.5 rounded border border-[#FFDAB3]/30 whitespace-nowrap shadow-md"> Only new tasks can be edited
                                    </div>
                                )}
                            </div>

                            {editingTask && (
                                <AdminEditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminTasksTable;