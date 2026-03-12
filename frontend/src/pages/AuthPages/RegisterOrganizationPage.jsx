import { useNavigate } from "react-router-dom";

const RegisterOrganizationPage = () => {

    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#0F1412]">

            <div className="bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-12 w-[125] text-center shadow-[0_0_40px_rgba(0,0,0,0.6)]">

                <h1 className="text-3xl font-bold text-[#FFDAB3] uppercase tracking-wider mb-4"> Organization Submitted </h1>

                <div className="bg-[#2C3930]/40 border border-[#FFDAB3]/30 rounded-xl py-4 px-6 mb-6">
                    <p className="text-lg text-[#A7C1A8]"> Your organization status is </p>
                    <h2 className="text-2xl font-bold text-yellow-400 mt-1"> PENDING APPROVAL </h2>
                </div>

                <p className="text-[#FFDAB3]/70 text-sm leading-relaxed mb-8">
                    Your organization registration has been submitted successfully.
                    A <span className="text-[#FFDAB3] font-semibold">Super Admin</span> will review and approve your request.
                    Once approved, you can sign in using your credentials and access the dashboard.
                </p>

                <button onClick={() => navigate("/login")} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-8 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> Go To Login </button>

            </div>
        </div>
    );
};

export default RegisterOrganizationPage;