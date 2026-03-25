import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import { clearOrganization } from "../../slices/organizationSlice";
import { logout as logoutRedux } from "../../slices/authSlice";
import toast from "react-hot-toast";

const useHeader = () => {

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

    return { organization, renderName, handleLogout };
}

export default useHeader;