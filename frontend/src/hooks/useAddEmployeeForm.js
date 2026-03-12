import { useState } from "react";
import { addEmployee } from "../api/employee";
import toast from "react-hot-toast";

const useAddEmployee = (refreshEmployees) => {

    const [dob, setDob] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            const formData = new FormData(e.target);
            const payload = {
                firstName: formData.get("firstName")?.trim(),
                lastName: formData.get("lastName")?.trim(),
                email: formData.get("email")?.trim().toLowerCase(),
                password: formData.get("password"),
                dateOfBirth: formData.get("dateOfBirth"),
                designation: formData.get("designation") || "Employee"
            };

            const response = await addEmployee(payload);

            if (!response?.success) {
                throw new Error(response?.message || "Could not add employee");
            }

            toast.success(response.message || "Employee added successfully");
            refreshEmployees?.();
            e.target.reset();

        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);

        } finally {
            setLoading(false);
        }
    };

    return { dob, setDob, loading, handleAddEmployee };
};

export default useAddEmployee;