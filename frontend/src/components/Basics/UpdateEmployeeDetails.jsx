import { DatePicker } from "../../constants/imports";
import useUpdateEmployeeDetails from "../../hooks/useUpdateEmployeeDetails";

const UpdateEmployeeDetails = ({ emp, setEmployees }) => {

    const { open, setOpen, loading, formData, handleChange, handleDateChange, handleUpdateEmployee } = useUpdateEmployeeDetails({ emp, setEmployees });

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

                                    <div>
                                        <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Email </label>
                                        <input required name="email" value={formData.email} onChange={handleChange} className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                    </div>

                                    <div>
                                        <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Date Of Birth </label>
                                        <div className="mt-2">
                                            <DatePicker selected={formData.dateOfBirth} onChange={handleDateChange} placeholderText="Select date of birth" dateFormat="dd/MM/yyyy" maxDate={new Date()} wrapperClassName="w-full" className="w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                                        </div>
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

export default UpdateEmployeeDetails;