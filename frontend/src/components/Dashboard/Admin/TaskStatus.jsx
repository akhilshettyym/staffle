import { useState, AuthContext, useContext, Header, AdminControl, PriorityTag, DateConversion, RemoveTask, EditTaskModal, BiSolidError } from "../../../constants/imports";

const TaskStatus = ({ data, handleLogout, orgData }) => {
  const authData = useContext(AuthContext);

  const admin = authData?.admin;
  const employees = authData?.employees ?? [];
  const tasks = admin?.tasks ?? [];

  const [editingTask, setEditingTask] = useState(null);

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id === id);
    return emp ? `${emp.firstName} ${emp.lastName}` : "Unassigned";
  };

  return (
    <div className="h-screen w-full p-10 overflow-auto">
      <Header data={data} handleLogout={handleLogout} orgData={orgData} />
      <AdminControl />

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase text-center"> Task Status </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      {tasks.length === 0 ? (
        <p className="mt-10 text-center text-[#F8F8F2]/60"> No tasks created yet. </p>
      ) : (
        <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
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
                    }[task.status] ||
                      "bg-gray-100 text-gray-600 border-gray-200"
                      }`}> {task.status}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium"> Category :</span>
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
                  <span className="text-xs text-[#F8F8F2]/60"> Task ID : {task.id} </span>
                  <div className="flex items-center gap-3">
                    <RemoveTask taskId={task.id} />

                    <div className="relative group">
                      <div className="relative group inline-block">
                        <button onClick={() => setEditingTask(task)} disabled={task.status !== "failed"}
                          className={`py-1 px-4 text-sm rounded-md border font-semibold transition ${task.status === "failed"
                            ? "border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"
                            : "border-[#957C62]/40 text-[#FFDAB3]/50 cursor-not-allowed opacity-60"
                            } disabled:hover:bg-transparent disabled:cursor-not-allowed `} > Edit </button>

                        {task.status !== "failed" && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#1B211A] text-[#FFDAB3]/90 text-xs px-3 py-1.5 rounded border border-[#FFDAB3]/30 whitespace-nowrap z-10">
                            Only failed tasks can be edited
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {editingTask && (<EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} />)}

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStatus;