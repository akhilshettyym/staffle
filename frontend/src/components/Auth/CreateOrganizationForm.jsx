import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PasswordToggle from "../Basics/PasswordToggle";
import useCreateOrganizationForm from "../../hooks/AuthHooks/useCreateOrganizationForm";

const CreateOrganizationForm = () => {

    const { dob, setDob, loading, handleCreateOrganization, handleConfirmPasswordBlur } = useCreateOrganizationForm();

    return (
        <div className="h-screen w-full p-10 bg-[#0F1412] overflow-auto">

            <div className="flex flex-col items-center justify-center text-center mb-10">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-[#FFDAB3]"> Create Your Organization </h1>
                <p className="mt-2 text-sm text-[#FFDAB3]/70">
                    Register as an organization admin to manage employees and tasks
                </p>
            </div>

            <div className="w-full flex justify-center">
                <form onSubmit={handleCreateOrganization} autoComplete="off" className="w-full bg-[#1B211A] p-10 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8">

                    <div className="w-full flex justify-between items-center">
                        <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Organization Admin Details </h2>
                        <Link to="/login" className="text-sm text-gray-400 hover:text-[#FFDAB3] hover:underline transition-colors uppercase"> Already have an account ? </Link>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label htmlFor="firstName" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> First Name </label>
                            <input id="firstName" name="firstName" type="text" placeholder="Enter your first name" autoComplete="given-name" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div>
                            <label htmlFor="email" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Email Address </label>
                            <input id="email" name="email" type="email" placeholder="Enter your email" autoComplete="email" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div className="mt-6">
                            <label htmlFor="dateOfBirth" className="text-md uppercase tracking-wide text-[#FFDAB3]/80 mr-10"> Date of Birth </label>
                            <DatePicker id="dateOfBirth" selected={dob} onChange={setDob} placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy" maxDate={new Date()} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={80} className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                            <input type="hidden" name="dateOfBirth" value={dob ? dob.toString() : ""} />
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label htmlFor="lastName" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Last Name </label>
                            <input id="lastName" name="lastName" type="text" placeholder="Enter your last name" autoComplete="family-name" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Password </label>
                            <PasswordToggle id="password" name="password" placeholder="Create a strong password" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" iconClassName="top-[55%]" />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Confirm Password </label>
                            <PasswordToggle id="confirmPassword" name="confirmPassword" onBlur={handleConfirmPasswordBlur} placeholder="Confirm password" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" iconClassName="top-[55%]" />
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="w-[60%]">
                            <label htmlFor="designation" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Admin Designation </label>
                            <input id="designation" name="designation" type="text" placeholder="Enter your designation" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full pt-6 border-t border-[#FFDAB3]/20">
                        <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Organization Information </h2>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label htmlFor="orgName" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Name </label>
                            <input id="orgName" name="orgName" type="text" placeholder="Enter organization name" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label htmlFor="orgCountry" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Country </label>
                            <select id="orgCountry" name="orgCountry" defaultValue="" className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition">
                                <option value="" disabled> Select organization country </option>
                                <option value="IN">INDIA</option>
                                <option value="US">USA</option>
                                <option value="CA">CANADA</option>
                                <option value="UK">UNITED KINGDOM</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="w-[60%] flex flex-col">
                            <label htmlFor="orgDomain" className="text-md uppercase tracking-wide text-[#FFDAB3]/80 flex justify-center"> Organization Domain </label>
                            <input id="orgDomain" name="orgDomain" type="text" placeholder="Enter organization domain"
                                className="mt-2 w-full bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition"
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="orgDescription" className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Description </label>
                        <textarea id="orgDescription" name="orgDescription" rows="5" placeholder="Briefly describe what your organization does" className="bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-4 text-[#FFDAB3] outline-none resize-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition mt-2" />
                    </div>

                    <div className="w-full flex flex-col items-center pt-2">

                        <button type="submit" disabled={loading} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? "Creating..." : "Create Organization"}
                        </button>

                        <Link to="/login" className="mt-4 text-sm text-gray-400 hover:text-[#FFDAB3] hover:underline transition-colors uppercase"> Already registered ? Login </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateOrganizationForm;