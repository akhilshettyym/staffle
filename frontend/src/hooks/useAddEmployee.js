import { useState } from "react";
import { addEmployee } from "../api/auth";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAddEmployee = () => {

    const [loading, setLoading] = useState(false);
    const { setAuth } = useContext(AuthContext) || {};

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        try {
            const formData = new FormData(e.target);
            const firstName = formData.get("firstName")?.trim();
            const lastName = formData.get("lastName")?.trim();
            const email = formData.get("email")?.trim().toLowerCase();
            const password = formData.get("password");
            const dateOfBirth = formData.get("dateOfBirth");
            const designation = formData.get("designation") || "Employee";

            if (!firstName || !lastName || !email || !password || !dateOfBirth || !designation) {
                throw new Error("Please fill all required fields");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Please enter a valid email address");
            }

            if (password.length < 8) {
                throw new Error("Password must be atleast 8 characters long");
            }

            const payload = { firstName, lastName, email, password, dateOfBirth, designation };

            const response = await addEmployee(payload);

            if (!response?.success) {
                throw new Error(response?.message || "Could not add employee");
            }

            const { token, user, message } = response;
            toast.success(message || "Employee added successfully");

            if (setAuth) {
                setAuth({ token, user });
            } else {
                localStorage.setItem("tb_token", token || "");
                localStorage.setItem("tb_user", JSON.stringify(user || {}));
            }

        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);

        } finally {
            setLoading(false);
        }
    };

    return { handleAddEmployee, loading };

};

export default useAddEmployee;