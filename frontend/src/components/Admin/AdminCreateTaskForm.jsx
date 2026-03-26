import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTooltip from "../Basics/CustomTooltip";
import useAdminCreateTaskForm from "../../hooks/adminHooks/useAdminCreateTaskForm";
import TaskListNo from "../Basics/TaskListNo";

const AdminCreateTaskForm = () => {

    const { tasks, employees, dueDate, loading, creationDate, fetchTasksDetails, fetchEmployees, handleOnChange, handleCreateTask } = useAdminCreateTaskForm();

    const renderEmployeeOptions = () => {
        if (!employees?.length) {
            return <option disabled value=""> No employees available </option>
        }

        return employees.map((emp) => (
            <option key={emp._id || emp.id} value={emp._id || emp.id}>
                {emp.firstName} {emp.lastName}
            </option>
        ));
    };

    useEffect(() => {
        fetchEmployees();
        fetchTasksDetails();
    }, []);

    return (
        <div className="pb-10">
            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Create Tasks </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <TaskListNo tasks={tasks} />

            <div className="flex items-center gap-2 mb-5 mt-5">
                <h1 className="text-lg uppercase text-[#FFDAB3] font-medium line-clamp-2"> Create new task </h1>
                <CustomTooltip id="create-new-task-tooltip" message="Triage and assign the new task based on severity." place="right" />
            </div>

            <div className="w-full flex justify-center">
                <form onSubmit={handleCreateTask} className="w-full bg-[#1B211A] p-6 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8">
                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Task Title </label>
                            <input required name="title" type="text" placeholder="Design dashboard UI" className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div className="relative">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Assign To </label>
                            <select required name="assignedTo" className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition">
                                <option value=""> Select an employee </option>
                                {renderEmployeeOptions()}
                            </select>
                            <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/60"> ↓ </span>
                        </div>

                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Category </label>
                            <input required name="category" type="text" placeholder="Design, Development, Testing" className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Creation Date </label>
                            <div className="mt-2">
                                <DatePicker selected={creationDate} disabled dateFormat="dd/MM/yyyy" wrapperClassName="w-full" className="w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div className="relative">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Priority </label>
                            <select required name="priority" className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/60"> ↓ </span>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80 mb-2"> Task Description </label>
                            <textarea required name="description" rows={5} placeholder="Clearly describe the task, expectations, and any important details..." className="mt-1 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div className="mt-2">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Due Date </label>
                            <div className="mt-2">
                                <DatePicker selected={dueDate} onChange={handleOnChange} placeholderText="Select due date" dateFormat="dd/MM/yyyy" minDate={new Date()} wrapperClassName="w-full" className="w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center pt-4">
                        <button type="submit" disabled={loading} className={`bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase ${loading ? "opacity-60 cursor-not-allowed" : ""
                            }`} > {loading ? "Creating..." : "Create Task"} </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCreateTaskForm;