import { DateConversion, PriorityTag, ConfirmModal } from "../../constants/imports";
import EmployeeFailedTaskModal from "./EmployeeFailedTaskModal";
import { BiSolidError } from "react-icons/bi";
import EmployeeTaskDetailsModal from "./EmployeeTaskDetailsModal";
import useEmployeeTaskCard from "../../hooks/EmployeeHooks/useEmployeeTaskCard";

const EmployeeTaskCard = ({ task, index, onTaskStatusChange }) => {

  const { assignedToUser, showFailModal, setShowFailModal, selectedTask, setSelectedTask, showCompleteModal, setShowCompleteModal, showAcceptModal, setShowAcceptModal, taskId, statusStyles, handleAcceptTask, handleMarkAsCompleted, handleRejectTask } = useEmployeeTaskCard({ task, onTaskStatusChange });

  const renderButtons = () => {
    switch (task?.status) {

      case "NEW":
        if (task?.rejection?.status === "REJECTED") {
          return (
            <div className="flex items-center gap-2 w-full">
              <button disabled className="py-2 px-4 rounded-md text-xs font-semibold text-red-500 border border-red-500 uppercase whitespace-nowrap"> Rejected
              </button>

              <button onClick={() => setShowAcceptModal(true)} className="py-2 px-4 rounded-md text-xs font-semibold bg-green-500 text-white border border-green-500 uppercase hover:bg-green-700 transition whitespace-nowrap"> Accept </button>

              <button onClick={() => setSelectedTask(task)} className="py-2 px-4 text-xs rounded-md border font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white whitespace-nowrap"> View </button>

              {selectedTask && (
                <EmployeeTaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} getEmployeeName={assignedToUser} />
              )}
            </div>
          );
        }

        return (
          <div className="grid grid-cols-2 gap-3 w-full">
            <button onClick={() => setShowAcceptModal(true)} className="py-2 px-5 rounded-md text-xs font-semibold bg-green-500 text-white border border-green-500 uppercase hover:bg-green-700 transition"> Accept </button>

            <button onClick={() => setShowFailModal(true)} className="py-2 px-5 rounded-md text-xs font-semibold bg-red-500 text-white border border-red-500 uppercase hover:bg-red-700 transition"> Reject </button>
          </div>
        );

      case "IN_PROGRESS":
        return (
          <div className="flex justify-end w-full">
            <button onClick={() => setShowCompleteModal(true)} className="py-2 px-5 rounded-md text-xs font-semibold bg-green-500 text-white border border-green-500 uppercase hover:bg-green-700 transition"> Complete </button>
          </div>
        );

      case "REJECTION_REQUESTED":
        return (
          <div className="flex items-center gap-3">
            <button disabled className="py-2 px-4 rounded-md text-xs font-semibold text-amber-500 border border-amber-500 uppercase"> Rejection Requested </button>

            <button onClick={() => setSelectedTask(task)} className="py-2 px-5 text-xs rounded-md border font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"> View </button>

            {selectedTask && (
              <EmployeeTaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} getEmployeeName={assignedToUser} />
            )}
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
            <h3 className="text-[#FFDAB3] font-medium uppercase line-clamp-2">
              {task?.title}
            </h3>
            <PriorityTag priorityMsg={task?.priority} />
          </div>
        </div>

        <div className="px-4 py-3 flex flex-col gap-2 text-sm text-[#F8F8F2]/80 flex-1">

          <div className="flex justify-between items-center">
            <span className="uppercase font-medium"> Status </span>

            <span className={`px-4 py-1 rounded-full font-bold uppercase border text-xs ${statusStyles[task?.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
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
            <span className="ml-2 text-[#FFDAB3]">
              {task?.description || "No description provided"}
            </span>
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
        <EmployeeFailedTaskModal taskId={taskId} onSuccess={(reason) => handleRejectTask(reason)} onClose={() => setShowFailModal(false)} />
      )}

      {showCompleteModal && (
        <ConfirmModal isOpen={showCompleteModal} title="Mark task as completed ?" message="Confirming will mark this task as completed. Once completed, this action cannot be reversed" btnTitle="Complete" confirmBtnClass="bg-green-500 border-green-600 hover:bg-green-600" onCancel={() => setShowCompleteModal(false)}
          onConfirm={() => {
            handleMarkAsCompleted();
            setShowCompleteModal(false);
          }} />
      )}

      {showAcceptModal && (
        <ConfirmModal isOpen={showAcceptModal} title="Accept this task ?" message="By accepting this task, its status will be updated to In-Progress" btnTitle="Accept" confirmBtnClass="bg-green-500 border-green-600 hover:bg-green-600" onCancel={() => setShowAcceptModal(false)}
          onConfirm={() => {
            handleAcceptTask();
            setShowAcceptModal(false);
          }} />
      )}
    </>
  );
};

export default EmployeeTaskCard;