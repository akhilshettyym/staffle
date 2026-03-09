import { useState } from "react";
import { logIn } from "../api/auth";
import { useNavigate } from "react-router-dom";

const useLogin = () => {

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

      const payload = { email, password };
      const response = await logIn(payload);
      console.log("Login success:", response);  // Remove later
      const role = response?.user?.role;

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "EMPLOYEE") {
        navigate("/employee/taskstatus");
      }

      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Login failed", error);

    } finally {
      setLoading(false);
    }
  };

  return { email, password, setEmail, setPassword, handleLogin, loading, onEmailChange, onPasswordChange };
};

export default useLogin;