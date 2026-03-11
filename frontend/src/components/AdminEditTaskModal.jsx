import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { getOrganizationUsers } from "../api/employee";
import { updateTask } from "../api/tasks";

const AdminEditTaskModal = ({ task, onClose, onTaskUpdated }) => {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: task?.title || "",
        category: task?.category || "",
        description: task?.description || "",
        priority: task?.priority || "Medium",
        assignedTo: task?.assignedTo || "",
        dueDate: task?.dueDate ? new Date(task.dueDate) : null,
    });

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

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({ ...prev, dueDate: date }));
    };

const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
        if (!formData.title?.trim()) {
            throw new Error("Task title is required");
        }
        if (!formData.category?.trim()) {
            throw new Error("Category is required");
        }
        if (!formData.priority) {
            throw new Error("Priority is required");
        }

        if (formData.dueDate && formData.dueDate < new Date()) {
            console.warn("Due date is in the past");
        }

        const payload = {
            title: formData.title.trim(),
            category: formData.category.trim(),
            description: formData.description?.trim() || "",
            assignedTo: formData.assignedTo || null, 
            priority: formData.priority,
            dueDate: formData.dueDate ? formData.dueDate.toISOString() : null,
        };


        const taskId = task?._id || task?.id;

        if (!taskId) {
            throw new Error("Cannot update task: missing task ID");
        }

        const response = await updateTask({ taskId, ...payload });

        if (!response?.success) {
            throw new Error(response?.message || "Failed to update task");
        }

        toast.success("Task updated successfully");

        const updatedTask = response.task || response.updatedTask || { ...task, ...payload };
        onTaskUpdated?.(updatedTask);

        onClose();

    } catch (error) {
        let msg = "Something went wrong while updating task";

        if (error.response?.data?.message) {
            msg = error.response.data.message;
        } else if (error.message) {
            msg = error.message;
        }

        console.error("Task update failed:", error);
        toast.error(msg);
        
    } finally {
        setLoading(false);
    }
};

    const renderEmployeeOptions = () => {
        if (!employees?.length) {
            return <option disabled value="">No employees available</option>;
        }
        return employees.map((emp) => (
            <option key={emp._id || emp.id} value={emp._id || emp.id}>
                {emp.firstName} {emp.lastName}
            </option>
        ));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] max-h-[85vh] flex flex-col overflow-hidden">

                <div className="px-6 pt-4 pb-2">
                    <h1 className="font-bold text-[#FFDAB3] text-xl uppercase text-center"> Edit Task </h1>
                    <hr className="mt-3 border border-[#FFDAB3]/40" />
                </div>

                <form onSubmit={handleUpdateTask} className="flex flex-col flex-1 overflow-hidden">
                    <div className="overflow-y-auto px-6 pb-6 flex-1">
                        <div className="flex flex-wrap gap-8">

                            <div className="w-full md:w-[100%] flex flex-col gap-6">
                                <div className="mt-3">
                                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Task Title </label>
                                    <input required name="title" value={formData.title} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                </div>

                                <div className="relative">
                                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Assign To </label>
                                    <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition">
                                        <option value=""> Unassigned </option>
                                        {renderEmployeeOptions()}
                                    </select>
                                    <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/60"> ↓ </span>
                                </div>

                                <div>
                                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Category </label>
                                    <input required name="category" value={formData.category} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                </div>

                                <div className="relative">
                                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Priority </label>
                                    <select required name="priority" value={formData.priority} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition pr-10">
                                        <option value="High"> High </option>
                                        <option value="Medium"> Medium </option>
                                        <option value="Low"> Low </option>
                                    </select>
                                    <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/60"> ↓ </span>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80 mb-2"> Task Description </label>
                                    <textarea name="description" rows={5} value={formData.description} onChange={handleChange} placeholder="Clearly describe the task, expectations, and any important details..." className="mt-1 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                </div>

                                <div className="mt-2">
                                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Due Date </label>
                                    <div className="mt-2">
                                        <DatePicker selected={formData.dueDate} onChange={handleDateChange} placeholderText="Select due date" dateFormat="dd/MM/yyyy" minDate={new Date()} wrapperClassName="w-full" className="w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-[#FFDAB3]/20 flex justify-center gap-6 shrink-0">
                        <button type="button" onClick={onClose} disabled={loading} className="px-8 py-2 rounded-full border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase hover:bg-[#FFDAB3]/10 transition disabled:opacity-50"> Cancel </button>

                        <button type="submit" disabled={loading} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-10 py-2 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase disabled:opacity-60"> {loading ? "Updating..." : "Update"} </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditTaskModal;