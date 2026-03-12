import DatePicker from 'react-datepicker';
import { updateAdmin } from '../../api/admin';
import toast from 'react-hot-toast';
import { useEffect, useMemo, useState } from 'react';
import { getOrganizationUsers } from '../../api/employee';
import { getOrganizationDetails } from '../../api/organization';

const UpdateAdminDetails = () => {

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);

    const admin = useMemo(() => employees.find((emp) => emp.role === "ADMIN"), [employees]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: null,
        designation: ""
    });

    useEffect(() => {
        if (admin) {
            setFormData({
                firstName: admin.firstName || "",
                lastName: admin.lastName || "",
                email: admin.email || "",
                dateOfBirth: admin?.dateOfBirth ? new Date(admin.dateOfBirth) : null,
                designation: admin.designation || ""
            });
        }
    }, [admin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            dateOfBirth: date
        }));
    };

    const handleUpdateAdmin = async (e) => {

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

            if (!formData.email?.trim()) {
                throw new Error("Email is required");
            }

            if (!formData.dateOfBirth) {
                throw new Error("Date of birth is required");
            }

            if (!formData.designation?.trim()) {
                throw new Error("Designation is required");
            }

            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim().toLowerCase(),
                dateOfBirth: formData.dateOfBirth.toISOString(),
                designation: formData.designation.trim()
            };

            const empId = admin?._id || admin?.id;

            if (!empId) {
                throw new Error("Employee Id missing");
            }

            const response = await updateAdmin({ empId, ...payload });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to update employee");
            }

            toast.success("Admin details updated successfully");

            setEmployees((prev) =>
                prev.map((e) =>
                    (e._id === empId || e.id === empId)
                        ? { ...e, ...payload }
                        : e
                )
            );

        } catch (error) {
            let msg = "Something went wrong while updating admin";
            if (error.response?.data?.message) {
                msg = error.response.data.message;
            } else if (error.message) {
                msg = error.message;
            }
            console.error("Admin updation failed", error);
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await getOrganizationUsers();
            setEmployees(response?.users || []);
        } catch (error) {
            console.error("Failed to fetch employees", error);
            toast.error("Could not fetch employees");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className='pb-10'>
            <div className="w-full flex justify-center">
                <form onSubmit={handleUpdateAdmin} className="w-full bg-[#1B211A] p-8 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8">

                    <div className="w-full flex justify-between items-center">
                        <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Update Admin Details </h2>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> First Name </label>
                            <input required name="firstName" value={formData.firstName} onChange={handleChange} className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Email </label>
                            <input required name="email" value={formData.email} onChange={handleChange} className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Last Name </label>
                            <input required name="lastName" value={formData.lastName} onChange={handleChange} className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Designation </label>
                            <input required name="designation" value={formData.designation} onChange={handleChange} className="mt-2 text-[#FFDAB3] w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="w-[50%] flex flex-col">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80 flex justify-center"> Date Of Birth </label>
                            <DatePicker selected={formData.dateOfBirth} onChange={handleDateChange} placeholderText="Select date of birth" dateFormat="dd/MM/yyyy" maxDate={new Date()} wrapperClassName="w-full" className="mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center pt-2">
                        <button type="submit" disabled={loading} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> {loading ? "Updating..." : "Update"} </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default UpdateAdminDetails;