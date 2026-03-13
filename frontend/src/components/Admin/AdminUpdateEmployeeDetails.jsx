import { DatePicker } from "../../constants/imports";
import "react-datepicker/dist/react-datepicker.css";
import useAdminUpdateEmployeeDetails from "../../hooks/AdminHooks/useAdminUpdateEmployeeDetails";

const AdminUpdateEmployeeDetails = ({ emp, setEmployees }) => {

    const { open, setOpen, loading, formData, handleChange, handleDateChange, handleUpdateEmployee } =
        useAdminUpdateEmployeeDetails({ emp, setEmployees });

    return (
        <>
            <button onClick={() => setOpen(true)} className="mr-2 py-1 px-4 text-sm rounded-md border font-semibold transition border-[#957C62] text-[#FFDAB3] hover:bg-[#957C62] hover:text-white"> Update </button>

            {open && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

                    <div className="w-full max-w-3xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)]">

                        <div className="px-6 py-4 border-b border-[#FFDAB3]/30 flex justify-between items-center">
                            <h1 className="font-bold text-[#FFDAB3] text-lg uppercase tracking-wide"> Update Employee Details </h1>
                            <button onClick={() => setOpen(false)} className="text-[#FFDAB3] text-xl hover:text-red-400"> ✕ </button>
                        </div>

                        <form onSubmit={handleUpdateEmployee} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm uppercase text-[#FFDAB3]/80"> First Name </label>
                                    <input required name="firstName" value={formData.firstName} onChange={handleChange} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                                </div>

                                <div>
                                    <label className="text-sm uppercase text-[#FFDAB3]/80"> Last Name </label>
                                    <input required name="lastName" value={formData.lastName} onChange={handleChange} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                                </div>

                                <div>
                                    <label className="text-sm uppercase text-[#FFDAB3]/80"> Email </label>
                                    <input required name="email" value={formData.email} onChange={handleChange} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                                </div>

                                <div>
                                    <label className="text-sm uppercase text-[#FFDAB3]/80"> Designation </label>
                                    <input required name="designation" value={formData.designation} onChange={handleChange} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-sm uppercase text-[#FFDAB3]/80"> Date Of Birth </label>
                                    <DatePicker selected={formData.dateOfBirth} onChange={handleDateChange} placeholderText="Select date of birth" dateFormat="dd/MM/yyyy" maxDate={new Date()} wrapperClassName="w-full" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3]" />
                                </div>
                            </div>

                            <div className="text-sm flex justify-end gap-4 mt-8">
                                <button type="button" onClick={() => setOpen(false)} disabled={loading} className="px-6 py-2 rounded-md border border-[#FFDAB3]/40 text-[#FFDAB3] font-semibold uppercase hover:bg-[#FFDAB3]/10 transition"> Cancel </button>

                                <button type="submit" disabled={loading} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-8 py-2 rounded-md hover:brightness-110 active:scale-95 transition-all uppercase"> {loading ? "Updating..." : "Update"} </button>
                            </div>
                        </form>
                    </div>

                </div>
            )}
        </>
    );
};

export default AdminUpdateEmployeeDetails;