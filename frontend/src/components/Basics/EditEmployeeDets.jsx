import { useState, toast, getLocalStorage, setLocalStorage } from "../../constants/imports";

const EditEmployeeDets = ({ emp, setEmployees }) => {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: emp.firstName,
        lastName: emp.lastName,
        position: emp.position,
        email: emp.email,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const taskbridge = getLocalStorage();

        const updatedEmployees = taskbridge.employees.map((e) =>
            e.id === emp.id
                ? {
                    ...e,
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    position: formData.position.trim(),
                    email: formData.email.trim(),
                }
                : e
        );

        taskbridge.employees = updatedEmployees;

        setLocalStorage(taskbridge);
        setEmployees([...updatedEmployees]);

        toast.success("Employee details updated");
        setOpen(false);
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="mr-2 py-1 px-4 text-sm rounded-md border-2 font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"> Edit </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="w-full max-w-md bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 shadow-xl">

                        <div className="px-6 pt-4">
                            <h2 className="text-[#FFDAB3] font-bold text-lg uppercase text-center"> Edit Employee </h2>
                            <hr className="mt-3 border border-[#FFDAB3]/40" />
                        </div>

                        <div className="px-6 py-5 flex flex-col gap-4">
                            <div>
                                <label className="text-sm uppercase text-[#FFDAB3]/80"> First Name </label>
                                <input name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-2 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                            </div>

                            <div>
                                <label className="text-sm uppercase text-[#FFDAB3]/80"> Last Name </label>
                                <input name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-2 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                            </div>

                            <div>
                                <label className="text-sm uppercase text-[#FFDAB3]/80"> Position </label>
                                <input name="position" value={formData.position} onChange={handleChange} className="mt-1 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-2 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                            </div>

                            <div>
                                <label className="text-sm uppercase text-[#FFDAB3]/80"> Email </label>
                                <input name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-2 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-[#FFDAB3]/20 flex justify-center gap-6">
                            <button onClick={() => setOpen(false)} className="px-6 rounded-full border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase hover:bg-[#FFDAB3]/10 transition"> Cancel </button>

                            <button onClick={handleSave} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-8 py-1 rounded-full hover:brightness-110 active:scale-95 transition uppercase"> Save </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default EditEmployeeDets;