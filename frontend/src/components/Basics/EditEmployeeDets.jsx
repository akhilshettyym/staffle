import { updateEmployee } from "../../api/employee";
import { useState, toast } from "../../constants/imports";

const EditEmployeeDets = ({ emp, setEmployees }) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: emp.firstName || "",
        lastName: emp.lastName || "",
        designation: emp.designation || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateEmployee = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {

            if (!formData.firstName?.trim()) {
                throw new Error("First Name is required");
            }

            if (!formData.lastName?.trim()) {
                throw new Error("Last Name is required");
            }

            if (!formData.designation?.trim()) {
                throw new Error("Designation is required");
            }

            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                designation: formData.designation.trim()
            };

            const empId = emp?._id || emp?.id;

            if (!empId) {
                throw new Error("Employee ID missing");
            }

            const response = await updateEmployee({ empId, ...payload });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to update employee");
            }

            toast.success("Employee updated successfully");

            setEmployees((prev) =>
                prev.map((e) =>
                    (e._id === empId || e.id === empId)
                        ? { ...e, ...payload }
                        : e
                )
            );

            setOpen(false);

        } catch (error) {

            let msg = "Something went wrong while updating employee";

            if (error.response?.data?.message) {
                msg = error.response.data.message;
            } else if (error.message) {
                msg = error.message;
            }

            console.error("Employee update failed", error);
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="mr-2 py-1 px-4 text-sm rounded-md border font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"> Update </button>

            {open && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

                    <div className="w-full max-w-2xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] max-h-[85vh] flex flex-col overflow-hidden">

                        <div className="px-6 pt-4 pb-2">
                            <h1 className="font-bold text-[#FFDAB3] text-xl uppercase text-center"> Update Employee Details </h1>
                            <hr className="mt-3 border border-[#FFDAB3]/40" />
                        </div>


                        <form onSubmit={handleUpdateEmployee} className="flex flex-col flex-1 overflow-hidden">
                            <div className="overflow-y-auto px-6 pb-6 flex-1">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> First Name </label>
                                        <input required name="firstName" value={formData.firstName} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                    </div>

                                    <div>
                                        <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Last Name </label>
                                        <input required name="lastName" value={formData.lastName} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                    </div>

                                    <div>
                                        <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Designation </label>
                                        <input required name="designation" value={formData.designation} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                    </div>
                                </div>
                            </div>


                            <div className="px-6 py-4 border-t border-[#FFDAB3]/20 flex justify-center gap-6 shrink-0">
                                <button type="button" onClick={() => setOpen(false)} disabled={loading} className="px-8 py-2 rounded-full border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase hover:bg-[#FFDAB3]/10 transition disabled:opacity-50"> Cancel </button>

                                <button type="submit" disabled={loading} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-10 py-2 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase disabled:opacity-60"> {loading ? "Updating..." : "Update"} </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    );
};

export default EditEmployeeDets;