import toast from 'react-hot-toast';
import AddEmployeeFrom from '../components/AddEmployeeForm';
import { useNavigate } from 'react-router-dom';
import AddedEmployees from '../components/AddedEmployees';
// import { getOrganizationUsers } from '../api/employee';

const CompleteOrganizationPage = () => {
    const navigate = useNavigate();

    // const response = await getOrganizationUsers();
    // console.log(response)

    return (
        <div className="h-screen w-full p-10 bg-[#0F1412] overflow-auto">
            <div className="flex flex-col items-center justify-center text-center mb-10">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-[#FFDAB3]">Complete Your Organization</h1>
                <p className="mt-2 text-sm text-[#FFDAB3]/70"> Register employees for your organization </p>
            </div>
            <AddEmployeeFrom />
            <hr className="my-6 border-2 border-[#FFDAB3]/40" />

            {/* <AddEmployees employees={employees} setEmployees={setEmployees} /> */}

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