import { useEffect } from "react";
import SuperAdminCreateTaskForm from "./SuperAdminCreateTaskForm";
import AdminTaskStatusCreatedTasks from "../Admin/AdminTaskStatusCreatedTasks";
import useSuperAdminTasksDashboard from "../../hooks/SuperAdminHooks/useSuperAdminTasksDashboard";

const SuperAdminTasksDashboard = () => {

  const { orgId, activeTab, setActiveTab, editingTask, setEditingTask, fetchSpecificOrganization, fetchOrgSpecificEmployees, orgSpecificTasks, fetchOrgSpecificTasks, setOrgSpecificTasks, getEmployeeName } = useSuperAdminTasksDashboard();

  useEffect(() => {
    if (!orgId) return;
    fetchSpecificOrganization();
    fetchOrgSpecificEmployees();
    fetchOrgSpecificTasks();

  }, [orgId]);

  return (
    <div className="pb-10">

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Tasks Details </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <div className="flex gap-4 mt-5">
        <button onClick={() => setActiveTab("create-tasks")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
          ${activeTab === "create-tasks"
            ? "bg-[#FFDAB3] text-[#1B211A]"
            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
          }`} >
          Create Tasks
        </button>

        <button onClick={() => setActiveTab("tasks-details")} className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
          ${activeTab === "tasks-details"
            ? "bg-[#FFDAB3] text-[#1B211A]"
            : "text-[#FFDAB3] border border-[#FFDAB3]/40 hover:bg-[#FFDAB3]/10"
          }`}>
          Tasks Details
        </button>
      </div>

      <div className="bg-[#1B211A] rounded-2xl p-4 border border-[#FFDAB3]/25 mt-5 pb-5">

        {activeTab === "create-tasks" && (
          <SuperAdminCreateTaskForm />
        )}

        {activeTab === "tasks-details" && (
          <AdminTaskStatusCreatedTasks refreshEmployeesData={fetchOrgSpecificEmployees} status={"new"} allCreatedTasks={orgSpecificTasks || []} fetchTasksDetails={fetchOrgSpecificTasks} fetchEmployees={fetchOrgSpecificEmployees} getEmployeeName={getEmployeeName} editingTask={editingTask} setEditingTask={setEditingTask} setTasks={setOrgSpecificTasks} />
        )}

      </div>
    </div>
  );
};

export default SuperAdminTasksDashboard;