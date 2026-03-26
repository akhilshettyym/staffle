import { useState } from "react";
import toast from "react-hot-toast";
import { updateEmployee } from "../../api/admin";

const useAdminUpdateEmployeeDetails = ({ emp, setEmployees }) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: emp.firstName || "",
        lastName: emp.lastName || "",
        email: emp.email || "",
        dateOfBirth: emp?.dateOfBirth ? new Date(emp.dateOfBirth) : null,
        designation: emp.designation || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({ ...prev, dateOfBirth: date }));
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

    return { open, setOpen, loading, formData, handleChange, handleDateChange, handleUpdateEmployee };
}

export default useAdminUpdateEmployeeDetails;