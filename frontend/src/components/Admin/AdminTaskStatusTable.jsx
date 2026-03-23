import { useEffect, useState } from "react";
import useAdminTaskStatusTable from "../../hooks/AdminHooks/useAdminTaskStatusTable";
import EmployeeTaskListNo from "../Employee/EmployeeTaskListNo";
import AdminTaskStatusFailed from "./AdminTaskStatusFailed";
import AdminTaskStatusAllTasks from "./AdminTaskStatusCreatedTasks";
import AdminTaskStatusReqRejection from "./AdminTaskStatusReqRejection";

const AdminTaskStatusTable = () => {
  const { tasks, status, failedTasks, editingTask, allCreatedTasks, selectedTask, requestedRejectionTasks, setSelectedTask, setTasks, setEditingTask, fetchTasksDetails, fetchEmployees, getEmployeeName } = useAdminTaskStatusTable();

  const [activeTab, setActiveTab] = useState("created-tasks");

  useEffect(() => {
    fetchTasksDetails();
    fetchEmployees();
  }, []);

  return (
    <div className="pb-10">

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Task Status </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <EmployeeTaskListNo tasks={tasks} />

      <div className="flex gap-4 mb-8 mt-10">
        <button onClick={() => setActiveTab("created-tasks")}
          className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
            ${activeTab === "created-tasks"
              ? "bg-[#FFDAB3] text-[#1B211A]"
              : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
            }`}> Created Tasks </button>

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
        <AdminTaskStatusAllTasks status={status} allCreatedTasks={allCreatedTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} fetchTasksDetails={fetchTasksDetails} fetchEmployees={fetchEmployees} getEmployeeName={getEmployeeName} />
      )}

      {activeTab === "failed-tasks" && (
        <AdminTaskStatusFailed editingTask={editingTask} failedTasks={failedTasks} setSelectedTask={setSelectedTask} setTasks={setTasks} setEditingTask={setEditingTask} fetchTasksDetails={fetchTasksDetails} fetchEmployees={fetchEmployees} getEmployeeName={getEmployeeName} />
      )}

      {activeTab === "request-rejection" && (
        <AdminTaskStatusReqRejection status={status} requestedRejectionTasks={requestedRejectionTasks} selectedTask={selectedTask} setSelectedTask={setSelectedTask} fetchTasksDetails={fetchTasksDetails} fetchEmployees={fetchEmployees} getEmployeeName={getEmployeeName} />
      )}

    </div>
  );
};

export default AdminTaskStatusTable;