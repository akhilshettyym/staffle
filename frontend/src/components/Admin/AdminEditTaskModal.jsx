import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAdminEditTaskModal from "../../hooks/AdminHooks/useAdminEditTaskModal";

const AdminEditTaskModal = ({ task, onClose, onTaskUpdated }) => {
    
    const { employees, loading, formData, fetchEmployees, handleChange, handleDateChange, handleUpdateTask } = useAdminEditTaskModal({ task, onClose, onTaskUpdated });

    const renderEmployeeOptions = () => {
        if (!employees?.length) {
            return <option disabled value=""> No employees available </option>;
        }
        return employees.map((emp) => (
            <option key={emp._id || emp.id} value={emp._id || emp.id}>
                {emp.firstName} {emp.lastName}
            </option>
        ));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
            <div className="w-full max-w-2xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_50px_rgba(0,0,0,0.7)] max-h-[90vh] flex flex-col overflow-hidden">

                <div className="shrink-0 px-6 py-4 border-b border-[#FFDAB3]/30 flex items-center justify-between bg-[#1B211A]">
                    <h2 className="font-bold text-[#FFDAB3] text-lg uppercase tracking-wide"> Edit Task </h2>
                    <button onClick={onClose} disabled={loading} className="text-[#FFDAB3] text-2xl hover:text-red-400 transition-colors focus:outline-none focus:text-red-400" aria-label="Close modal" > ✕ </button>
                </div>

                <form onSubmit={handleUpdateTask} className="p-6 space-y-6">

                    <div className="grid grid-cols-6 gap-5">
                        <div className="col-span-3">
                            <label className="block text-sm uppercase text-[#FFDAB3]/80 mb-2 font-medium"> Task Title </label>
                            <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" placeholder="Enter task title" />
                        </div>

                        <div className="col-span-3 relative">
                            <label className="block text-sm uppercase text-[#FFDAB3]/80 mb-2 font-medium"> Assign To </label>
                            <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] appearance-none outline-none focus:border-[#FFDAB3]">
                                <option value="">Unassigned</option>
                                {renderEmployeeOptions()}
                            </select>
                            <span className="pointer-events-none absolute right-4 top-[50%] text-[#FFDAB3]/60"> ↓ </span>
                        </div>

                        <div className="col-span-2 relative">
                            <label className="block text-sm uppercase text-[#FFDAB3]/80 mb-2 font-medium"> Priority </label>
                            <select required name="priority" value={formData.priority} onChange={handleChange} className="w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] appearance-none outline-none focus:border-[#FFDAB3]">
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                            <span className="pointer-events-none absolute right-4 top-[50%] text-[#FFDAB3]/60"> ↓ </span>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm uppercase text-[#FFDAB3]/80 mb-2 font-medium"> Category </label>
                            <input required name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm uppercase text-[#FFDAB3]/80 mb-2 font-medium"> Due Date </label>
                            <DatePicker selected={formData.dueDate} onChange={handleDateChange} placeholderText="Select due date" dateFormat="dd/MM/yyyy" minDate={new Date()} wrapperClassName="w-full" className="w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                        </div>

                        <div className="col-span-6">
                            <label className="block text-sm uppercase text-[#FFDAB3]/80 mb-2 font-medium"> Task Description </label>
                            <textarea name="description" rows={3} value={formData.description} onChange={handleChange} placeholder="Clearly describe the task..." className="w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 text-sm">
                        <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2 rounded-lg border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase hover:bg-[#FFDAB3]/10 transition"> Cancel </button>

                        <button type="submit" disabled={loading} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-8 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all uppercase"> {loading ? "Updating..." : "Update Task"} </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default AdminEditTaskModal;