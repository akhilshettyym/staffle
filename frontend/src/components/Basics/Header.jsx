import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearOrganization } from "../../slices/organizationSlice";
import { logout as logoutRedux } from "../../slices/authSlice";

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const organization = useSelector((state) => state.organization?.data);

    const firstName = user?.firstName || "User";
    const lastName = user?.lastName || "";
    const renderName = `${firstName} ${lastName}`.trim();

    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(logoutRedux());
            dispatch(clearOrganization());

            toast.success("You've been logged out successfully");
            navigate("/", { replace: true });

        } catch (err) {
            toast.error("Something went wrong during logout");
        }
    };

    return (
        <div className="bg-[#1B211A] p-3 rounded-2xl border border-[#FFDAB3] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <h1 className="ml-5 text-2xl text-[#FFDAB3] font-semibold uppercase"> {organization?.orgName || "Organization"} </h1>

                <div className="flex items-center gap-6">
                    {renderName && (
                        <h2 className="text-md font-medium text-[#FFDAB3] uppercase"> {renderName} </h2>
                    )}

                    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg text-md font-semibold transition-colors uppercase duration-200"> Logout </button>
                </div>
            </div>
        </div>
    );
};

export default Header;