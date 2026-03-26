import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiCheckCircle, FiXCircle, FiSlash, FiRotateCcw } from "react-icons/fi";

const SuperAdminControlPanel = () => {

    const { pathname } = useLocation();

    const navItems = [
        {
            label: "Organizations",
            path: "/superadmin/superadmin-dashboard",
            icon: <FiGrid size={18} />
        },
        {
            label: "Approve Org.",
            path: "/superadmin/approve-organizations",
            icon: <FiCheckCircle size={18} />
        },
        {
            label: "Rejected Orgs.",
            path: "/superadmin/rejected-organizations",
            icon: <FiXCircle size={18} />
        },
        {
            label: "Revoke Org.",
            path: "/superadmin/revoke-organizations",
            icon: <FiSlash size={18} />
        },
        {
            label: "Re-activate Org.",
            path: "/superadmin/reactivate-organizations",
            icon: <FiRotateCcw size={18} />
        },
    ];

    return (
        <div className="mt-6">
            <div className="bg-[#626F47]/35 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md">
                <div className="flex flex-wrap items-center gap-3">

                    <h1 className="ml-5 mr-5 text-[#FFDAB3] text-sm uppercase font-semibold"> Super Admin Dashboard </h1>

                    {navItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link key={item.path} to={item.path} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all duration-200 
                                ${isActive
                                    ? "bg-[#FFDAB3] text-[#1B211A] shadow-md"
                                    : "text-[#FFDAB3] hover:bg-[#FFDAB3]/10 hover:shadow"
                                }`}>
                                <span className="opacity-90">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminControlPanel;