import { Link, useLocation } from "react-router-dom";
import { FiLayers, FiShield, FiUsers, FiClipboard } from "react-icons/fi";

const SuperAdminControlledControlPanel = () => {

    const { pathname } = useLocation();

    const navItems = [
        {
            label: "Organizations",
            path: "/superadmin/control/organization-dashboard",
            icon: <FiLayers size={16} />
        },
        {
            label: "Admins",
            path: "/superadmin/control/admin-dashboard",
            icon: <FiShield size={16} />
        },
        {
            label: "Employees",
            path: "/superadmin/control/employee-dashboard",
            icon: <FiUsers size={16} />
        },
        {
            label: "Tasks",
            path: "/superadmin/control/tasks-dashboard",
            icon: <FiClipboard size={16} />
        },
    ];

    return (
        <div className="mt-5">
            <div className="bg-[#626F47]/35 backdrop-blur-sm rounded-2xl px-6 py-2 shadow-md">

                <div className="flex flex-wrap items-center gap-4">

                    <h1 className="text-[#FFDAB3] text-md uppercase font-semibold tracking-wider mr-4"> Super Admin Control </h1>

                    {navItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link key={item.path} to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200
                                ${isActive
                                        ? "bg-[#FFDAB3] text-[#1B211A] shadow-md"
                                        : "text-[#FFDAB3] hover:bg-[#FFDAB3]/10 hover:shadow"
                                    }
                                `}>
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

export default SuperAdminControlledControlPanel;