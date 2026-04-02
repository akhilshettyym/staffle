import { Link } from "react-router-dom";
import PasswordToggle from "../Basics/PasswordToggle";
import useLoginForm from "../../hooks/AuthHooks/useLoginForm";

const LoginForm = () => {

  const { email, password, loading, handleLogin, onEmailChange, onPasswordChange } = useLoginForm();

  return (
    <div className="relative">

      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-[#FFDAB3]/10 rounded-full blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-[#FFDAB3]/8 rounded-full blur-3xl opacity-50" />
      <div className="relative bg-[#1B211A]/95 border border-[#FFDAB3]/25 rounded-2xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.7)] backdrop-blur-sm">

        <form onSubmit={handleLogin} className="flex flex-col items-center gap-7">

          <div className="w-full">
            <label className="block text-md uppercase tracking-wide text-[#FFDAB3]/80 mb-2"> Email Address </label>

            <input value={email} onChange={onEmailChange} required type="email" placeholder="Enter your email" className="w-80 bg-[#0F1412] border border-[#FFDAB3]/20 rounded-2xl px-5 py-3 text-[#FFDAB3] outline-none placeholder:text-gray-400 focus:border-[#FFDAB3] focus:ring-2 focus:ring-[#FFDAB3]/20 transition-all duration-200" />
          </div>

          <div className="w-full">
            <label className="block text-md uppercase tracking-wide text-[#FFDAB3]/80 mb-2"> Password </label>

            <PasswordToggle value={password} onChange={onPasswordChange} placeholder="Enter your password" className="w-80 bg-[#0F1412] border border-[#FFDAB3]/20 rounded-2xl px-5 py-3 text-[#FFDAB3] outline-none placeholder:text-gray-400 focus:border-[#FFDAB3] focus:ring-2 focus:ring-[#FFDAB3]/20 transition-all duration-200" />
          </div>

          <button type="submit" disabled={loading} className="mt-3 w-full bg-[#FFDAB3] text-[#1B211A] font-semibold py-3 rounded-full hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#FFDAB3]/10 uppercase"> {loading ? "Logging In..." : "Login"} </button>

          <p className="text-sm text-gray-400 uppercase text-center"> Not a registered user ?
            <Link to="/create-organization" className="ml-2 text-sm text-gray-400 hover:text-[#FFDAB3] hover:underline transition-colors uppercase"> Sign Up </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;