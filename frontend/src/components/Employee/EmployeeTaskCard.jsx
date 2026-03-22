import { useSelector } from "react-redux";
import { useState, DateConversion, PriorityTag, toast } from "../../constants/imports";
import EmployeeFailedTaskModal from "./EmployeeFailedTaskModal";
import { BiSolidError } from "react-icons/bi";
import EmployeeTaskDetailsModal from "./EmployeeTaskDetailsModal";
import { acceptTask, markAsCompleted } from "../../api/tasks";

const EmployeeTaskCard = ({ task, index, onTaskAccepted }) => {

  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(null);
  const assignedToUser = `${user.firstName} ${user.lastName}`;

  const [showFailModal, setShowFailModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const statusStyles = {
    NEW: "bg-amber-100 text-amber-700 border-amber-200",
    IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-200",
    COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    FAILED: "bg-red-100 text-red-700 border-red-200"
  };

  const handleAcceptTask = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const taskId = task?._id ?? task?.id;
      if (!taskId) throw new Error("No task ID");

      const response = await acceptTask(taskId);

      if (!response?.success) {
        throw new Error(response?.message || "Accept failed");
      }

      toast.success("Task accepted");

      onTaskAccepted?.(taskId);

    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectTask = async () => {

  };

  const handleMarkAsCompleted = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const taskId = task?._id || task?.id;
      if (!taskId) throw new Error("No task ID");

      const response = await markAsCompleted(taskId);

      if (!response?.success) {
        throw new Error(response?.message || "Complete failed");
      }

      toast.success("Task marked as completed");
      
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || "Something went wrong while marking task as completed";
      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsFailed = async () => {

  };

  const renderButtons = () => {

    switch (task?.status) {

      case "NEW":
        return (
          <div className="grid grid-cols-2 gap-3 w-full">
            <button onClick={handleAcceptTask} className="py-2 px-5 rounded-md text-xs font-semibold bg-green-500 text-white border border-green-500 uppercase hover:bg-green-700 transition"> Accept </button>

            <button onClick={() => setShowFailModal(true)} className="py-2 px-5 rounded-md text-xs font-semibold bg-red-500 text-white border border-red-500 uppercase hover:bg-red-700 transition"> Reject </button>
          </div>
        );

      case "IN_PROGRESS":
        return (
          <div className="grid grid-cols-2 gap-3 w-full">
            <button onClick={handleMarkAsCompleted} className="py-2 px-5 rounded-md text-xs font-semibold bg-green-500 text-white border border-green-500 uppercase hover:bg-green-700 transition"> Complete </button>

            <button onClick={() => setShowFailModal(true)} className="py-2 px-5 rounded-md text-xs font-semibold bg-red-500 text-white border border-red-500 uppercase hover:bg-red-700 transition"> Fail </button>
          </div>
        );

      case "COMPLETED":
        return (
          <>
            <button disabled className="py-2 px-5 rounded-md text-xs font-semibold text-green-500 border border-green-500 uppercase"> Completed </button>

            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedTask(task)} className="py-2 px-5 text-xs rounded-md border font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"> View </button>
            </div>

            {selectedTask && (
              <EmployeeTaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} getEmployeeName={assignedToUser} />
            )}
          </>
        );

      case "FAILED":
        return (
          <>
            <button disabled className="py-2 px-5 rounded-md text-xs font-semibold text-red-500 border border-red-500 uppercase"> Failed </button>

            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedTask(task)} className="py-2 px-5 text-xs rounded-md border font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"> View </button>
            </div>

            {selectedTask && (
              <EmployeeTaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} getEmployeeName={assignedToUser} />
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-[#FFDAB3]/10 rounded-2xl border border-[#FFDAB3]/30 hover:border-[#FFDAB3]/50 transition flex flex-col">

        <div className="px-2 py-2 border-b border-[#FFDAB3]/20">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/25">
            <h3 className="text-[#FFDAB3] font-medium uppercase line-clamp-2"> {task?.title} </h3>
            <PriorityTag priorityMsg={task?.priority} />
          </div>
        </div>


        <div className="px-4 py-3 flex flex-col gap-2 text-sm text-[#F8F8F2]/80 flex-1">

          <div className="flex justify-between items-center">
            <span className="uppercase font-medium"> Status </span>

            <span className={`px-4 py-1 rounded-full font-bold uppercase border text-xs ${statusStyles[task?.status] ||
              "bg-gray-100 text-gray-600 border-gray-200"
              }`}>
              {task?.status?.replace("_", " ")}
            </span>
          </div>

          <div>
            <span className="font-medium"> Category : </span>
            <span className="text-[#FFDAB3] ml-1"> {task?.category} </span>
          </div>

          <div className="flex justify-between text-sm">
            <span> Created :
              <span className="font-medium text-[#FFDAB3] ml-1">
                <DateConversion convertDate={task?.createdAt} />
              </span>
            </span>

            <span> Due :
              <span className="font-medium text-[#FFDAB3] ml-1">
                <DateConversion convertDate={task?.dueDate} />
              </span>
            </span>
          </div>

          <div>
            <span className="font-medium"> Description : </span>
            <span className="ml-2 text-[#FFDAB3]"> {task?.description || "No description provided"} </span>
          </div>

          <div className="text-xs text-[#F8F8F2]/70 flex items-center justify-between">

            <div> Assigned to :
              <span className="ml-2 uppercase text-[#FFDAB3] font-semibold"> {assignedToUser} </span>
            </div>

            {task?.failureReason?.trim() && (
              <div className="relative group">

                <span className="text-red-500 cursor-help hover:text-red-400 transition">
                  <BiSolidError size={20} />
                </span>

                <div className="absolute z-20 right-0 bottom-full mb-2 hidden group-hover:block w-80 max-w-[90vw] px-3 py-2.5 bg-[#1B1F1A] text-[#F8F8F2] text-xs rounded-lg border-2 border-red-500/40 shadow-xl whitespace-pre-wrap">

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
          <span className="text-xs text-[#F8F8F2]/60"> Task ID : {index} </span>
          <div className="flex items-center gap-3"> {renderButtons()} </div>
        </div>
      </div>

      {showFailModal && (
        <EmployeeFailedTaskModal task={task} handleRejectTask={handleRejectTask} onClose={() => setShowFailModal(false)} />
      )}
    </>
  );
};

export default EmployeeTaskCard;