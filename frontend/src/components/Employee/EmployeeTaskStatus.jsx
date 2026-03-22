import EmployeeTaskListNo from "./EmployeeTaskListNo";
import EmployeeTaskCard from "./EmployeeTaskCard";
import { useEffect, useState, useMemo } from "react";
import { getTaskDetails } from "../../api/tasks";
import toast from "react-hot-toast";
import { getOrganizationUsers } from "../../api/employee";
import { useSelector } from "react-redux";
import DateConversion from "../Basics/DateConversion";
import PriorityTag from "../Basics/PriorityTag";
import EmployeeTaskDetailsModal from "./EmployeeTaskDetailsModal";
import CustomTooltip from "../Basics/CustomTooltip";

const EmployeeTaskStatus = () => {

  const user = useSelector((state) => state.auth.user);

  const [selectedTask, setSelectedTask] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const assignedToUser = `${user?.firstName} ${user?.lastName}`

  const fetchEmployees = async () => {
    try {
      const response = await getOrganizationUsers();
      if (response?.success) {
        setEmployees(response.users || []);
      } else {
        toast.error(response?.message || "Failed to load employees");
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      toast.error("Could not fetch employees");
    }
  };

  const fetchTasksDetails = async () => {
    try {
      const response = await getTaskDetails();
      if (response?.success) {
        setTasks(response.tasks || []);
      } else {
        toast.error(response?.message || "Failed to load tasks");
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      toast.error("Could not fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasksDetails();
    fetchEmployees();
  }, []);


  const employeeTasks = useMemo(() => {
    if (!tasks || !user?._id) return [];

    return tasks
      .filter(task => task.assignedTo === user._id)
      .sort((a, b) => {

        if (a.status === "NEW" && b.status !== "NEW") return -1;
        if (a.status !== "NEW" && b.status === "NEW") return 1;

        return new Date(b.createdAt) - new Date(a.createdAt);
      });

  }, [tasks, user?._id]);


  return (
    <div className="pb-10">
      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Task Status </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <EmployeeTaskListNo tasks={employeeTasks} />

      <div className="flex items-center gap-2 mt-5">
        <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Tasks in queue </h1>
        <CustomTooltip id="task-status-tooltip" message="Track your task assignments and deadlines from this panel." place="right" />
      </div>

      <div className="mt-5 bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
        {employeeTasks.length === 0 ? (
          <div className="text-center py-12 text-[#F8F8F2]/60 text-lg">
            No tasks assigned to you
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employeeTasks.map((task, index) => (
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
                      <span className="ml-2 uppercase text-[#FFDAB3] font-semibold"> {assignedToUser}
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
                    <button onClick={() => setSelectedTask(task)} className="py-1 px-4 text-sm rounded-md border font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"> View </button>
                  </div>

                </div>
              </div>
            ))}

            {selectedTask && (
              <EmployeeTaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} getEmployeeName={assignedToUser} />
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTaskStatus;