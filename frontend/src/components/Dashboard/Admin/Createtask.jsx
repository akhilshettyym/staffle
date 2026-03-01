import { useContext, useEffect, useState, DatePicker, generateSequentialId, getLocalStorage, AuthContext, toast } from "../../../constants/imports";

const CreateTask = () => {
    const [employees, setEmployees] = useState([]);

    const { updateAuthData } = useContext(AuthContext);

    const [creationDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        assignedTo: "",
        category: "",
        priority: "Medium",
        description: "",
    });

    useEffect(() => {
        const taskbridge = getLocalStorage();
        setEmployees(taskbridge?.employees || []);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateTask = (e) => {
        e.preventDefault();
        if (!formData.assignedTo || !dueDate) return;

        const taskbridge = getLocalStorage();

        const taskPayload = {
            id: generateSequentialId("task"),
            title: formData.title.trim(),
            category: formData.category.trim(),
            priority: formData.priority,
            description: formData.description.trim(),
            createdAt: creationDate.toISOString(),
            dueDate: dueDate.toISOString(),
            status: "new",
            assignedTo: formData.assignedTo,
        };

        const updatedEmployees = taskbridge.employees.map((emp) =>
            emp.id === formData.assignedTo
                ? {
                    ...emp,
                    tasks: [...emp.tasks, taskPayload],
                    taskNumbers: {
                        ...emp.taskNumbers,
                        newTask: emp.taskNumbers.newTask + 1,
                    },
                }
                : emp
        );

        const updatedAdmin = {
            ...taskbridge.admin,
            tasks: [...(taskbridge.admin.tasks || []), taskPayload],
        };

        const updatedTaskbridge = {
            ...taskbridge,
            admin: updatedAdmin,
            employees: updatedEmployees,
        };

        updateAuthData(updatedTaskbridge);
        setDueDate(null);
        setFormData({ title: "", assignedTo: "", category: "", priority: "Medium", description: "" });
        toast.success("Task Created Successfully");
    };

    return (
        <div className="pb-10">

            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="mt-5 font-bold text-[#FFDAB3] text-xl uppercase flex flex-col items-center"> Create Tasks </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="w-full flex justify-center">
                <form onSubmit={handleCreateTask} className="w-full bg-[#1B211A] p-6 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8">
                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Task Title </label>
                            <input required name="title" type="text" placeholder="Design dashboard UI" value={formData.title} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div className="relative">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Assign To </label>
                            <select required name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition">
                                <option value="">Select an employee</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.firstName} {emp.lastName}
                                    </option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/60"> ↓ </span>
                        </div>

                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Category </label>
                            <input required name="category" type="text" placeholder="Design, Development, Testing" value={formData.category} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
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
                            <select required name="priority" value={formData.priority} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <span className="pointer-events-none absolute right-6 top-[54%] text-[#FFDAB3]/60"> ↓ </span>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80 mb-2"> Task Description </label>
                            <textarea required name="description" rows="5" placeholder="Clearly describe the task, expectations, and any important details..." value={formData.description} onChange={handleChange} className="mt-1 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div className="mt-2">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Due Date </label>
                            <div className="mt-2">
                                <DatePicker selected={dueDate} onChange={setDueDate} placeholderText="Select due date" dateFormat="dd/MM/yyyy" minDate={new Date()} wrapperClassName="w-full" className="w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center pt-4">
                        <button type="submit" className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> Create Task </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;