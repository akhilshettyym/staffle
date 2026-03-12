import { useState } from "react";
import { logIn } from "../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        email: email.trim(),
        password
      };
      const response = await logIn(payload);
      console.log("Login success:", response);
      const role = response?.user?.role;

      if (role === "ADMIN") {
        navigate("/admin/admin-dashboard");
      } else if (role === "EMPLOYEE") {
        navigate("/employee/employee-dashboard");
      } else {
        navigate("/superadmin/superadmin-dashboard")
      }

      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Login failed", error);
      const message = error.response?.data?.message || "Something went wrong during login";
      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return { email, password, loading, setEmail, setPassword, handleLogin, onEmailChange, onPasswordChange };
};

export default useLoginForm;