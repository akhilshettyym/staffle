import { useState, useContext, useLocation, AuthContext, getLocalStorage, DateConversion, PriorityTag, FailedTaskModal, toast } from "../../../constants/imports";

const TaskCard = ({ task }) => {
  const location = useLocation();
  const { updateAuthData } = useContext(AuthContext);
  const [showFailModal, setShowFailModal] = useState(false);

  const { id, status, title, category, description, priority, createdAt, dueDate, assignedTo } = task;

  const isStatusPage = location.pathname.startsWith("/employee/taskstatus");

  const getStatusLabel = () => {
    switch (status) {
      case "new":
        return "New Task";
      case "inprogress":
        return "Task In Progress";
      case "completed":
        return "Completed Task";
      case "failed":
        return "Failed Task";
      default:
        return "Unknown Task";
    }
  };

  const normalizeTaskNumbers = (nums = {}) => ({
    newTask: nums.newTask || 0,
    active: nums.active || 0,
    completed: nums.completed || 0,
    failed: nums.failed || 0,
  });

  const failTaskWithReason = (reason) => {
    const taskbridge = getLocalStorage();

    const updatedEmployees = taskbridge.employees.map((emp) => {
      if (emp.id !== assignedTo) return emp;

      const nums = normalizeTaskNumbers(emp.taskNumbers);

      return {
        ...emp,
        tasks: emp.tasks.map((t) =>
          t.id === id
            ? { ...t, status: "failed", failureReason: reason }
            : t
        ),
        taskNumbers: {
          ...nums,
          newTask: Math.max(nums.newTask - 1, 0),
          active: Math.max(nums.active - 1, 0),
          failed: nums.failed + 1,
        },
      };
    });

    const updatedAdmin = {
      ...taskbridge.admin,
      tasks: taskbridge.admin.tasks.map((t) =>
        t.id === id
          ? { ...t, status: "failed", failureReason: reason }
          : t
      ),
    };

    updateAuthData({
      ...taskbridge,
      admin: updatedAdmin,
      employees: updatedEmployees,
    });

    toast.success("Task moved to Failed");
    setShowFailModal(false);
  };

  const updateTaskStatus = (newStatus, counterUpdate, msg) => {
    const taskbridge = getLocalStorage();

    const updatedEmployees = taskbridge.employees.map((emp) => {
      if (emp.id !== assignedTo) return emp;

      const currentNums = normalizeTaskNumbers(emp.taskNumbers);

      return {
        ...emp,
        tasks: emp.tasks.map((t) =>
          t.id === id ? { ...t, status: newStatus } : t
        ),
        taskNumbers: counterUpdate(currentNums),
      };
    });

    const updatedAdmin = {
      ...taskbridge.admin,
      tasks: taskbridge.admin.tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      ),
    };

    updateAuthData({
      ...taskbridge,
      admin: updatedAdmin,
      employees: updatedEmployees,
    });

    toast.success(msg);
  };

  const handleAcceptTask = () =>
    updateTaskStatus(
      "inprogress",
      (nums) => ({
        ...nums,
        newTask: Math.max(nums.newTask - 1, 0),
        active: nums.active + 1,
      }),
      "Task accepted"
    );

  const handleComplete = () =>
    updateTaskStatus(
      "completed",
      (nums) => ({
        ...nums,
        active: Math.max(nums.active - 1, 0),
        completed: nums.completed + 1,
      }),
      "Task marked as Completed"
    );

  const getButtons = () => {
    switch (status) {
      case "new":
        return (
          <div className="grid grid-cols-2 gap-3 w-full">
            <button onClick={handleAcceptTask} className="py-2 px-6 rounded-sm text-sm font-semibold bg-green-500 text-white border border-green-500 uppercase hover:bg-green-700 transition-colors"> Accept Task </button>
            <button onClick={() => setShowFailModal(true)} className="py-2 px-6 rounded-sm text-sm font-semibold bg-red-500 text-white border border-red-500 uppercase hover:bg-red-700 transition-colors"> Reject Task </button>
          </div>
        );

      case "inprogress":
        return (
          <div className="grid grid-cols-2 gap-3 w-full">
            <button onClick={handleComplete} className="px-6 rounded-sm text-xs font-semibold bg-green-500 text-white border border-green-500 uppercase hover:bg-green-700 transition-colors">  Mark as Completed </button>
            <button onClick={() => setShowFailModal(true)} className="px-6 rounded-sm text-xs font-semibold bg-red-500 text-white border border-red-500 uppercase hover:bg-red-700 transition-colors"> Mark as Failed </button>
          </div>
        );

      case "completed":
        return (
          <div className="grid gap-3 w-full">
            <button className="py-2 px-6 rounded-sm text-sm font-semibold text-green-500 border border-green-500 uppercase" disabled> Completed </button>
          </div>
        );

      case "failed":
        return (
          <div className="grid gap-3 w-full">
            <button className="py-2 px-6 rounded-sm text-sm font-semibold text-red-500 border border-red-500 uppercase" disabled> Failed </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-[#FFDAB3]/10 rounded-2xl border border-[#FFDAB3]/30 hover:border-[#FFDAB3]/50 transition-colors flex flex-col h-full">
        <div className="px-2 py-2 border-b border-[#FFDAB3]/20">
          <div className="flex items-center justify-between gap-2 px-4 py-2 bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/25">
            <h3 className="text-[#FFDAB3] font-medium text-md uppercase flex-1">{title}</h3>
            <PriorityTag priorityMsg={priority} />
          </div>
        </div>

        <div className="px-4 py-3 flex-1 flex flex-col gap-2 text-[#F8F8F2]/80">
          <div className="flex justify-between items-center">
            <span className="font-medium uppercase">Status</span>
            <span className={`px-4 rounded-2xl text-sm font-bold uppercase border ${{
              new: "bg-amber-100 text-amber-700 border-amber-200",
              inprogress: "bg-blue-100 text-blue-700 border-blue-200",
              completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
              failed: "bg-red-100 text-red-700 border-red-200",
            }[status]}`}>
              {getStatusLabel()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="font-medium">Category :</span>
            <span className="font-medium text-[#FFDAB3]">{category}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span> Created : <span className="font-medium text-[#FFDAB3] ml-1"><DateConversion convertDate={createdAt} /></span></span>
            <span> Due : <span className="font-medium text-[#FFDAB3] ml-1"><DateConversion convertDate={dueDate} /></span></span>
          </div>

          <div className="text-sm">
            <span className="font-medium"> Description : </span>
            <span className="ml-2 text-[#FFDAB3]">{description || "No description provided"}</span>
          </div>

          <span className="text-[#F8F8F2]/60 text-sm"> Task ID : {id}</span>
        </div>

        {!isStatusPage && (
          <div className="border-t border-[#FFDAB3]/20">
            <div className="px-3 py-3">
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/25">
                {getButtons()}
              </div>
            </div>
          </div>
        )}
      </div>

      {showFailModal && (
        <FailedTaskModal onClose={() => setShowFailModal(false)} onSave={failTaskWithReason} />
      )}
    </>
  );
};

export default TaskCard;