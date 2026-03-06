import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, AuthContext } from "../constants/imports";
import { createOrganization } from "../api/auth";

const useCreateOrganization = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext) || {};

    const handleConfirmPasswordBlur = (e) => {
        const confirmPassword = e.target.value;
        const form = e.target.form;
        const password = form.password?.value;

        if (!confirmPassword || !password) return;

        if (confirmPassword !== password) {
            toast.error("Passwords do not match");
        }
    };

    const handleCreateOrganization = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        try {
            const formData = new FormData(e.target);
            const firstName = formData.get("firstName")?.trim();
            const lastName = formData.get("lastName")?.trim();
            const email = formData.get("email")?.trim().toLowerCase();
            const password = formData.get("password");
            const confirmPassword = formData.get("confirmPassword");
            const dateOfBirth = formData.get("dateOfBirth");
            const designation = formData.get("designation") || "Admin";
            const orgName = formData.get("orgName")?.trim();
            const orgDescription = formData.get("orgDescription")?.trim();
            const orgCountry = formData.get("orgCountry")?.trim() || null;
            const orgDomain = formData.get("orgDomain")?.trim() || orgName?.toLowerCase().replace(/\s+/g, "-");

            if (!firstName || !lastName || !email || !password || !confirmPassword || !dateOfBirth || !orgName || !orgDescription) {
                throw new Error("Please fill all required fields");
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Please enter a valid email address");
            }

            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const payload = { firstName, lastName, email, password, confirmPassword, dateOfBirth, designation, orgName, orgDomain, orgDescription, orgCountry };

            const response = await createOrganization(payload);
            
            if (!response?.success) {
                throw new Error(response?.message || "Could not create organization");
            }

            const { token, user, message } = response;
            toast.success(message || "Organization created successfully");

            if (setAuth) {
                setAuth({ token, user });
            } else {
                localStorage.setItem("tb_token", token || "");
                localStorage.setItem("tb_user", JSON.stringify(user || {}));
            }

            navigate("/register-org");

        } catch (error) {
            const message = error?.response?.data?.message || error.message || "Something went wrong";
            toast.error(message);

        } finally {
            setLoading(false);
        }
    };

    return { handleCreateOrganization, handleConfirmPasswordBlur, loading };

};

export default useCreateOrganization;