import { Link, useNavigate, generateSequentialId, setLocalStorage, uuidv4, PasswordToggle, toast } from "../../constants/imports";

const SignUp = () => {

    const navigate = useNavigate();

    const handleCreateOrg = (e) => {
        e.preventDefault();

        const taskbridge = {
            organization: {
                uuid: `org-${uuidv4()}`,
                id: generateSequentialId("org"),
                name: e.target.orgName.value,
                category: e.target.orgCategory.value,
                description: e.target.orgDesc.value,
                createdAt: new Date().toLocaleDateString("en-GB"),
            },
            admin: {
                uuid: `admin-${uuidv4()}`,
                id: generateSequentialId("admin"),
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                password: e.target.password.value,
                tasks: [],
            },
            employees: [],
        };
        setLocalStorage(taskbridge);
        navigate("/register-org");
        toast.success("Organization created successfully")
    };

    return (
        <div className="h-screen w-full p-10 bg-[#0F1412] overflow-auto">

            <div className="flex flex-col items-center justify-center text-center mb-10">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-[#FFDAB3]"> Create Your Organization </h1>
                <p className="mt-2 text-sm text-[#FFDAB3]/70">
                    Register as an organization admin to manage employees and tasks
                </p>
            </div>

            <div className="w-full flex justify-center">
                <form onSubmit={handleCreateOrg} className="w-full bg-[#1B211A] p-10 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8">

                    <div className="w-full flex justify-between items-center">
                        <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Organization Admin Details </h2>
                        <Link to="/signin" className="text-sm text-gray-400 hover:text-[#FFDAB3] hover:underline transition-colors uppercase"> Already have an account ? </Link>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> First Name </label>
                            <input name="firstName" type="text" placeholder="Enter your first name" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Email Address </label>
                            <input name="email" type="email" placeholder="Enter your email" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Last Name </label>
                            <input name="lastName" type="text" placeholder="Enter your last name" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Password </label>
                            <PasswordToggle name="password" placeholder="Create a strong password" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" iconClassName="top-[55%]" />
                        </div>
                    </div>

                    <div className="w-full pt-6 border-t border-[#FFDAB3]/20">
                        <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Organization Information </h2>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Name </label>
                            <input name="orgName" type="text" placeholder="Enter organization name" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Category </label>
                            <input name="orgCategory" type="text" placeholder="IT, Marketing, Finance, R&D" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#F8F8F2] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col">
                        <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Description </label>
                        <textarea name="orgDesc" rows="5" placeholder="Briefly describe what your organization does" className="bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-4 text-[#F8F8F2] outline-none resize-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition mt-2" />
                    </div>

                    <div className="w-full flex flex-col items-center pt-2">
                        <button type="submit" className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> Create Organization </button>
                        <Link to="/signin" className="mt-4 text-sm text-gray-400 hover:text-[#FFDAB3] hover:underline transition-colors uppercase"> Already registered ? Sign In </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignUp;