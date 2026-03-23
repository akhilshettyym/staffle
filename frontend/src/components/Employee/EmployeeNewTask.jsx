import EmployeeTaskListNo from "./EmployeeTaskListNo";
import EmployeeTaskCard from "./EmployeeTaskCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getTaskDetails } from "../../api/tasks";
import { getOrganizationUsers } from "../../api/employee";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CustomTooltip from "../Basics/CustomTooltip";

const EmployeeNewTask = () => {

  const [activeTab, setActiveTab] = useState("new");

  const user = useSelector((state) => state.auth.user);

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

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

  const getMyTasks = useCallback((status) => {
    if (!user?._id) return [];

    const myId = user._id;

    return tasks.filter(task => {
      const isMine = task.assignedTo === myId;
      return status ? isMine && task.status === status : isMine;
    });
  }, [tasks, user?._id]);

  const employeeTasks = useMemo(
    () => getMyTasks(),
    [getMyTasks]
  );

  const employeeNewTasks = useMemo(
    () => getMyTasks("NEW"),
    [getMyTasks]
  );

  const employeeRequestedRejectionTasks = useMemo(
    () => getMyTasks("REJECTION_REQUESTED"),
    [getMyTasks]
  );

  const handleTaskStatusChange = useCallback((taskId, status, reason) => {
    setTasks(prev =>
      prev.map(t =>
        (t._id ?? t.id) === taskId
          ? { ...t, status, failureReason: reason || t.failureReason }
          : t
      )
    );
  }, []);

  return (
    <div className="pb-10">

      <hr className="my-5 border border-[#FFDAB3]/40" />
      <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> New Tasks </h1>
      <hr className="my-5 border border-[#FFDAB3]/40" />

      <EmployeeTaskListNo tasks={employeeTasks} />

      <div className="flex gap-4 mb-8 mt-10">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-5 py-2 rounded-md uppercase text-sm font-semibold transition
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
      </div>

      {activeTab === "new" && (
        <>
          <div className="flex items-center gap-2 mt-5">
            <h1 className="text-lg uppercase text-[#FFDAB3] font-medium"> Newly Assigned Tasks </h1>
            <CustomTooltip id="new-tasks-tooltip" message="Please review newly assigned tasks to accept or decline." place="right" />
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
            <CustomTooltip id="request-rejection-tooltip" message="Tasks where rejection has been requested." place="right" />
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

    </div>
  );
};

export default EmployeeNewTask;