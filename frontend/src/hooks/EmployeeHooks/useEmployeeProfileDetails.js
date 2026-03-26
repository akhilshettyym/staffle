import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useTasksDetails from "../../utils/useTasksDetails";
import useEmployeesDetails from "../../utils/useEmployeesDetails";
import { updateEmployee } from "../../api/admin";

const useEmployeeProfileDetails = () => {

    const [loading, setLoading] = useState(false);

    const { tasks, fetchTasksDetails } = useTasksDetails();
    const { employees, setEmployees, fetchEmployees } = useEmployeesDetails();

    const employee = useSelector((state) => state.auth?.user || "");
    const loggedInUser = employees.find((e) => e._id === employee._id || e.id === employee._id);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: null,
        designation: ""
    });

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

            const empId = loggedInUser?._id || loggedInUser?.id;

            if (!empId) {
                throw new Error("Employee Id missing");
            }

            const response = await updateEmployee({ empId, ...payload });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to update employee");
            }

            toast.success("Employee details updated successfully");

            setEmployees((prev) =>
                prev.map((e) =>
                    (e._id === empId || e.id === empId)
                        ? { ...e, ...payload }
                        : e
                )
            );

        } catch (error) {
            let msg = "Something went wrong while updating employee details";
            if (error.response?.data?.message) {
                msg = error.response.data.message;
            } else if (error.message) {
                msg = error.message;
            }
            console.error("Employee updation failed", error);
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    const employeeTasks = useMemo(() => {
        if (!employee?._id) return [];

        return tasks.filter(
            (task) => task.assignedTo === employee._id
        );
    }, [tasks, employee]);

    return { loading, loggedInUser, formData, setFormData, handleChange, handleDateChange, handleUpdateEmployee, fetchEmployees, fetchTasksDetails, employeeTasks };
}

export default useEmployeeProfileDetails;