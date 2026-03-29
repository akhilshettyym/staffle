import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { updateAdmin } from "../../api/admin";
import useEmployeesDetails from "../../utils/useEmployeesDetails";

const useAdminUpdateAdminDetails = ({ refreshAdminData, adminOverride }) => {

    const [loading, setLoading] = useState(false);

    const { employees, setEmployees, fetchEmployees } = useEmployeesDetails();

    const admin = useMemo(() => {
        if (adminOverride) return adminOverride;
        return employees.find((emp) => emp.role === "ADMIN");
    }, [adminOverride, employees]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: null,
        designation: ""
    });

    useEffect(() => {
        if (!admin) return;

        const parsedDate = admin.dateOfBirth ? new Date(admin.dateOfBirth) : null;

        setFormData({
            firstName: admin.firstName || "",
            lastName: admin.lastName || "",
            email: admin.email || "",
            dateOfBirth: parsedDate,
            designation: admin.designation || ""
        });
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
            if (!formData.firstName?.trim()) throw new Error("First Name is required");
            if (!formData.lastName?.trim()) throw new Error("Last Name is required");
            if (!formData.email?.trim()) throw new Error("Email is required");
            if (!formData.dateOfBirth) throw new Error("Date of birth is required");
            if (!formData.designation?.trim()) throw new Error("Designation is required");

            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim().toLowerCase(),
                dateOfBirth: formData.dateOfBirth.toISOString(),
                designation: formData.designation.trim()
            };

            const empId = admin?._id || admin?.id;

            const response = await updateAdmin({ empId, ...payload });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to update employee");
            }

            toast.success("Admin details updated successfully");
            refreshAdminData?.();

            setEmployees((prev) =>
                prev.map((e) =>
                    (e._id === empId || e.id === empId)
                        ? { ...e, ...payload }
                        : e
                )
            );

        } catch (error) {
            let msg = "Something went wrong while updating admin";

            if (error.response?.data?.message)
                msg = error.response.data.message;
            else if (error.message)
                msg = error.message;

            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    return { loading, formData, handleChange, handleDateChange, handleUpdateAdmin, fetchEmployees };
};

export default useAdminUpdateAdminDetails;