import { PasswordToggle, Link } from "../../constants/imports";
import useLoginForm from "../../hooks/useLoginForm";

const LoginForm = () => {

  const { email, password, loading, handleLogin, onEmailChange, onPasswordChange } = useLoginForm();

  return (
    <div className="bg-[#1B211A] border border-[#FFDAB3]/40 rounded-2xl p-10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">

      <form onSubmit={handleLogin} className="flex flex-col items-center gap-6">

        <div className="w-full">
          <label className="block text-md uppercase tracking-wide text-[#FFDAB3]/80 mb-2"> Email Address </label>

          <input value={email} onChange={onEmailChange} required type="email" placeholder="Enter your email" className="w-80 bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-5 py-3 text-[#F8F8F2] outline-none placeholder:text-gray-400 focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
        </div>

        <div className="w-full">
          <label className="block text-md uppercase tracking-wide text-[#FFDAB3]/80 mb-2"> Password </label>

          <PasswordToggle value={password} onChange={onPasswordChange} placeholder="Enter your password" className="w-80 bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-5 py-3 text-[#F8F8F2] outline-none placeholder:text-gray-400 focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
        </div>

        <button type="submit" disabled={loading} className="mt-4 w-full bg-[#FFDAB3] text-[#1B211A] font-semibold py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> {loading ? "Logging In..." : "Login"} </button>

        <p className="text-sm text-gray-400 uppercase"> Not a registered user ?
          <Link to="/create-organization" className="ml-2 text-sm text-gray-400 hover:text-[#FFDAB3] hover:underline transition-colors uppercase"> Sign Up </Link>
        </p>

      </form>
    </div>
  );
};

export default LoginForm;