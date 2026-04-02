import { useEffect } from "react";
import TaskListNo from "../Basics/TaskListNo";
import EmployeeTaskCard from "./EmployeeTaskCard";
import CustomTooltip from "../Basics/CustomTooltip";
import useEmployeeNewTask from "../../hooks/EmployeeHooks/useEmployeeNewTask";

const EmployeeNewTask = () => {

  const { activeTab, setActiveTab, fetchEmployees, fetchTasksDetails, employeeTasks, employeeNewTasks, employeeRequestedRejectionTasks, employeeRejectedRequests, handleTaskStatusChange } = useEmployeeNewTask();

  useEffect(() => {
    fetchTasksDetails();
    fetchEmployees();
  }, []);

  return (
    <div className="pb-10">

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> New Tasks </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <TaskListNo tasks={employeeTasks} />

      <div className="flex gap-4 mb-5 mt-10 flex-wrap">
        <button onClick={() => setActiveTab("new")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
          ${activeTab === "new"
            ? "bg-[#FFDAB3] text-[#1B211A]"
            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
          }`}>
          New Tasks
        </button>

        <button onClick={() => setActiveTab("request-rejection")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
          ${activeTab === "request-rejection"
            ? "bg-[#FFDAB3] text-[#1B211A]"
            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
          }`}>
          Rejection Requested
        </button>

        <button onClick={() => setActiveTab("request-rejected")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
          ${activeTab === "request-rejected"
            ? "bg-[#FFDAB3] text-[#1B211A]"
            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
          }`}>
          Request Rejected
        </button>
      </div>

      {activeTab === "new" && (
        <>
          <div className="flex items-center gap-2 mt-5">
            <h1 className="text-lg uppercase text-[#FFDAB3] font-medium"> Newly Assigned Tasks </h1>
            <CustomTooltip id="new-tasks-tooltip" message="Review newly assigned tasks and either accept them or request rejection with justification." place="right" />
          </div>

          <div className="mt-5 bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
            {employeeNewTasks.length === 0 ? (
              <div className="text-center py-12 text-[#F8F8F2]/60 text-lg">
                No new tasks at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {employeeNewTasks.map((task, index) => (
                  <EmployeeTaskCard key={task._id || task.id} index={index + 1} task={task} onTaskStatusChange={handleTaskStatusChange} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "request-rejection" && (
        <>
          <div className="flex items-center gap-2 mt-5">
            <h1 className="text-lg uppercase text-[#FFDAB3] font-medium"> Rejection Requested Tasks </h1>
            <CustomTooltip id="request-rejection-tooltip" message="Tasks listed here have rejection requests pending review by the administrator." place="right" />
          </div>

          <div className="mt-5 bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
            {employeeRequestedRejectionTasks.length === 0 ? (
              <div className="text-center py-12 text-[#F8F8F2]/60 text-lg">
                No rejection requests.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {employeeRequestedRejectionTasks.map((task, index) => (
                  <EmployeeTaskCard key={task._id || task.id} index={index + 1} task={task} onTaskStatusChange={handleTaskStatusChange} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "request-rejected" && (
        <>
          <div className="flex items-center gap-2 mt-5">
            <h1 className="text-lg uppercase text-[#FFDAB3] font-medium"> Request Rejected By Admin </h1>
            <CustomTooltip id="request-rejected-tooltip" message="These tasks remain active after the administrator declined your rejection request." place="right" />
          </div>

          <div className="mt-5 bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25">
            {employeeRejectedRequests.length === 0 ? (
              <div className="text-center py-12 text-[#F8F8F2]/60 text-lg">
                No rejected requests.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {employeeRejectedRequests.map((task, index) => (
                  <EmployeeTaskCard key={task._id || task.id} index={index + 1} task={task} onTaskStatusChange={handleTaskStatusChange} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default EmployeeNewTask;