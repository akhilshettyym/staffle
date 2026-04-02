import { useEffect } from "react";
import TaskListNo from "../Basics/TaskListNo";
import AdminTaskStatusFailedTasks from "./AdminTaskStatusFailedTasks";
import AdminTaskStatusReqRejection from "./AdminTaskStatusReqRejection";
import AdminTaskStatusCreatedTasks from "./AdminTaskStatusCreatedTasks";
import AdminTaskStatusCompletedTasks from "./AdminTaskStatusCompletedTasks";
import AdminTaskStatusInProgressTasks from "./AdminTaskStatusInProgressTasks";
import useAdminTaskStatusTable from "../../hooks/AdminHooks/useAdminTaskStatusTable";

const AdminTaskStatusTable = () => {

  const { tasks, status, failedTasks, editingTask, activeTab, setActiveTab, allCreatedTasks, inProgressTasks, completedTasks, selectedTask, requestedRejectionTasks, setSelectedTask, setTasks, setEditingTask, fetchTasksDetails, fetchEmployees, getEmployeeName, refreshEmployeesData } = useAdminTaskStatusTable();

  useEffect(() => {
    fetchTasksDetails();
    fetchEmployees();
  }, []);

  return (
    <div className="pb-10">

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Task Status </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <TaskListNo tasks={tasks} />

      <div className="flex gap-4 mb-5 mt-10">
        <button onClick={() => setActiveTab("created-tasks")}
          className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
            ${activeTab === "created-tasks"
              ? "bg-[#FFDAB3] text-[#1B211A]"
              : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
            }`}> Created Tasks </button>

        <button onClick={() => setActiveTab("inprogress-tasks")}
          className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
            ${activeTab === "inprogress-tasks"
              ? "bg-[#FFDAB3] text-[#1B211A]"
              : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
            }`}> In-Progress Tasks </button>

        <button onClick={() => setActiveTab("completed-tasks")}
          className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
            ${activeTab === "completed-tasks"
              ? "bg-[#FFDAB3] text-[#1B211A]"
              : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
            }`}> Completed Tasks </button>

        <button onClick={() => setActiveTab("failed-tasks")}
          className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
                ${activeTab === "failed-tasks"
              ? "bg-[#FFDAB3] text-[#1B211A]"
              : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
            }`}> Failed Tasks </button>

        <button onClick={() => setActiveTab("request-rejection")}
          className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
                ${activeTab === "request-rejection"
              ? "bg-[#FFDAB3] text-[#1B211A]"
              : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
            }`}> Rejection Requested </button>
      </div>

      {activeTab === "created-tasks" && (
        <AdminTaskStatusCreatedTasks refreshEmployeesData={refreshEmployeesData} editingTask={editingTask} setEditingTask={setEditingTask} setTasks={setTasks} status={status} allCreatedTasks={allCreatedTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} fetchTasksDetails={fetchTasksDetails} fetchEmployees={fetchEmployees} getEmployeeName={getEmployeeName} />
      )}

      {activeTab === "inprogress-tasks" && (
        <AdminTaskStatusInProgressTasks refreshEmployeesData={refreshEmployeesData} status={status} inProgressTasks={inProgressTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} fetchTasksDetails={fetchTasksDetails} fetchEmployees={fetchEmployees} getEmployeeName={getEmployeeName} />
      )}

      {activeTab === "completed-tasks" && (
        <AdminTaskStatusCompletedTasks refreshEmployeesData={refreshEmployeesData} status={status} completedTasks={completedTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} fetchTasksDetails={fetchTasksDetails} fetchEmployees={fetchEmployees} getEmployeeName={getEmployeeName} />
      )}

      {activeTab === "failed-tasks" && (
        <AdminTaskStatusFailedTasks refreshEmployeesData={refreshEmployeesData} editingTask={editingTask} failedTasks={failedTasks} setSelectedTask={setSelectedTask} setTasks={setTasks} setEditingTask={setEditingTask} fetchTasksDetails={fetchTasksDetails} fetchEmployees={fetchEmployees} getEmployeeName={getEmployeeName} />
      )}

      {activeTab === "request-rejection" && (
        <AdminTaskStatusReqRejection status={status} requestedRejectionTasks={requestedRejectionTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} fetchTasksDetails={fetchTasksDetails} fetchEmployees={fetchEmployees} getEmployeeName={getEmployeeName} />
      )}

    </div>
  );
};

export default AdminTaskStatusTable;