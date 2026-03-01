import { Link, useLocation, FiGrid, FiClipboard, FiUsers, FiBarChart2, FiBarChart, AdminOutline } from "../../../constants/imports";

const AdminControl = () => {
    const { pathname } = useLocation();

    const navItems = [
        { label: "Dashboard", path: "/admin/dashboard", icon: <FiGrid size={18} /> },
        { label: "Created Tasks", path: "/admin/tasks", icon: <FiClipboard size={18} /> },
        { label: "Task Status", path: "/admin/status", icon: <FiBarChart2 size={18} /> },
        { label: "Emp. Details", path: "/admin/employees", icon: <FiUsers size={18} /> },
        { label: "Emp. Mgmt.", path: "/admin/management", icon: <FiBarChart size={18} /> },
        { label: "Admin details", path: "/admin/details", icon: <AdminOutline size={18} /> }
    ];

    return (
        <div className="mt-6">
            <div className="bg-[#626F47]/35 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="ml-1 mr-1 text-[#FFDAB3] text-sm uppercase font-semibold"> Admin Dashboard </h1>
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link key={item.path} to={item.path} className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-sm uppercase tracking-wide transition-all duration-200 ${isActive
                                ? "bg-[#FFDAB3] text-[#1B211A] shadow-md"
                                : "text-[#FFDAB3] hover:bg-[#FFDAB3]/10 hover:shadow"
                                } `}>
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

export default AdminControl;