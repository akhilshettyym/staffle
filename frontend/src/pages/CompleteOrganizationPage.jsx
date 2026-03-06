import toast from 'react-hot-toast';
import AddEmployeeFrom from '../components/AddEmployeeForm';
import { useNavigate } from 'react-router-dom';
import AddedEmployees from '../components/AddedEmployees';
// import { getOrganizationUsers } from '../api/employee';

const CompleteOrganizationPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full p-10 bg-[#0F1412] overflow-auto">
            <div className="flex flex-col items-center justify-center text-center mb-10">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-[#FFDAB3]">Complete Your Organization</h1>
                <p className="mt-2 text-sm text-[#FFDAB3]/70"> Register employees for your organization </p>
            </div>



            <div className="w-full bg-[#1B211A] p-10 justify-center rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8 mb-10">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Organization and Admin details </h2>
                </div>

                <div className="w-full md:w-[48%] flex flex-col gap-6">
                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Org Name </label>
                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Org Country </label>
                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Admin Name </label>
                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Admin DOB </label>
                    
                </div>

                <div className="w-full md:w-[48%] flex flex-col gap-6">
                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Org Domain </label>
                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Admin Email </label>
                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Admin Designation </label>
                    <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Org Description </label>
                </div>
            </div>



            <AddEmployeeFrom />
            <hr className="my-6 border-2 border-[#FFDAB3]/40" />

            <AddedEmployees />

            <div className="w-full flex flex-col items-center pt-2">
                <button onClick={() => {
                    toast.success("Organization Registered Successfully..");
                    navigate("/signin");
                }} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-14 py-4 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> Register Org </button>

                <p className="mt-3 text-sm text-[#FFDAB3]/60 text-center"> You can add more employees later from the dashboard. </p>
            </div>
        </div>
    )
}

export default CompleteOrganizationPage;