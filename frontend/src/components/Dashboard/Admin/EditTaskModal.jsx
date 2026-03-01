import { useState, useContext, AuthContext, getLocalStorage, toast } from "../../../constants/imports";

const EditTaskModal = ({ task, onClose }) => {
    const { updateAuthData, employees } = useContext(AuthContext);

    const adminTasks = location.pathname.startsWith("/admin/tasks");

    const [formData, setFormData] = useState({
        title: task.title,
        category: task.category,
        priority: task.priority,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        assignedTo: task.assignedTo || "",
    });

    const normalizeTaskNumbers = (nums = {}) => ({
        newTask: nums.newTask || 0,
        active: nums.active || 0,
        completed: nums.completed || 0,
        failed: nums.failed || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const taskbridge = getLocalStorage();

        const oldAssignedTo = task.assignedTo;
        const newAssignedTo = formData.assignedTo;

        const shouldResetStatus =
            task.status === "failed" && newAssignedTo;

        const finalTaskData = {
            ...task,
            ...formData,
            status: shouldResetStatus ? "new" : formData.status,
            failureReason: shouldResetStatus ? "" : task.failureReason,
        };

        const updatedAdmin = {
            ...taskbridge.admin,
            tasks: taskbridge.admin.tasks.map((t) =>
                t.id === task.id ? finalTaskData : t
            ),
        };

        const updatedEmployees = taskbridge.employees.map((emp) => {
            const nums = normalizeTaskNumbers(emp.taskNumbers);

            if (emp.id === oldAssignedTo && oldAssignedTo !== newAssignedTo) {
                return {
                    ...emp,
                    tasks: emp.tasks.filter((t) => t.id !== task.id),
                    taskNumbers: {
                        ...nums,
                        failed:
                            task.status === "failed"
                                ? Math.max(nums.failed - 1, 0)
                                : nums.failed,
                    },
                };
            }

            if (emp.id === newAssignedTo) {
                const exists = emp.tasks.some((t) => t.id === task.id);

                return {
                    ...emp,
                    tasks: exists
                        ? emp.tasks.map((t) =>
                            t.id === task.id ? finalTaskData : t
                        )
                        : [...emp.tasks, finalTaskData],
                    taskNumbers: {
                        ...nums,
                        newTask:
                            task.status === "failed" && !exists
                                ? nums.newTask + 1
                                : nums.newTask,
                    },
                };
            }

            return emp;
        });

        updateAuthData({
            ...taskbridge,
            admin: updatedAdmin,
            employees: updatedEmployees,
        });

        toast.success(
            shouldResetStatus
                ? "Task reassigned and reset to NEW"
                : "Task updated successfully"
        );
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-500 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] max-h-[75vh] flex flex-col">

                <div className="px-6 pt-3">
                    <h1 className="font-bold text-[#FFDAB3] text-xl uppercase text-center"> Edit Task </h1>
                    <hr className="mt-3 border border-[#FFDAB3]/40" />
                </div>

                <div className="overflow-y-auto px-6 pb-6">
                    <div className="flex flex-wrap gap-8">
                        <div className="w-full flex flex-col gap-6 mt-5">
                            <div>
                                <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Task Title </label>
                                <input name="title" value={formData.title} onChange={handleChange} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                            </div>

                            <div>
                                <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Category </label>
                                <input name="category" value={formData.category} onChange={handleChange} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                            </div>

                            <div className="relative">
                                <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Priority </label>
                                <select name="priority" value={formData.priority} onChange={handleChange} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] appearance-none outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition">
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                                <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/60"> ↓ </span>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-6">
                            <div className="relative">
                                <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Status </label>
                                <select value={formData.status} disabled className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/20 rounded-2xl px-4 py-3 text-[#FFDAB3]/70 appearance-none outline-none cursor-not-allowed opacity-70">
                                    <option value={formData.status}>
                                        {formData.status === "new" && "New"}
                                        {formData.status === "inprogress" && "In Progress"}
                                        {formData.status === "completed" && "Completed"}
                                        {formData.status === "failed" && "Failed"}
                                    </option>
                                </select>
                                <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/40"> ↓ </span>
                            </div>

                            <div className="relative">
                                <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Assign To </label>
                                <select name="assignedTo" value={formData.assignedTo || ""} onChange={handleChange} disabled={adminTasks} className={`mt-2 w-full bg-[#0F1412] border rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition pr-10 appearance-none ${adminTasks ? "border-[#FFDAB3]/20 text-[#FFDAB3]/70 cursor-not-allowed opacity-70"
                                    : "border-[#FFDAB3]/30 cursor-pointer"
                                    }`}>
                                    <option value="">Unassigned</option>
                                    {employees?.map((emp) => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.firstName} {emp.lastName}
                                        </option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/60"> ↓ </span>
                            </div>

                            <div>
                                <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Task Description </label>
                                <textarea name="description" rows={5} value={formData.description} onChange={handleChange} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-3 border-t border-[#FFDAB3]/20 flex justify-center gap-6">
                    <button onClick={onClose} className="px-8 rounded-full border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase hover:bg-[#FFDAB3]/10 transition"> Cancel </button>
                    <button onClick={handleSave} className="bg-[#FFDAB3] text-[#1B211A] text-md font-bold px-10 py-1 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> Save </button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;