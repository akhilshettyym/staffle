import { Link, useLocation, FiGrid, FiClipboard, FiUsers, FiBarChart2, FiBarChart } from "../../../constants/imports";

const EmployeeControl = () => {
    const { pathname } = useLocation();

    const navItems = [
        { label: "Task Status", path: "/employee/taskstatus", icon: <FiGrid size={18} /> },
        { label: "New Tasks", path: "/employee/newtasks", icon: <FiClipboard size={18} /> },
        { label: "In Progress", path: "/employee/inprogress", icon: <FiBarChart size={18} /> },
        { label: "Completed / Failed", path: "/employee/tasklifecycle", icon: <FiBarChart2 size={18} /> },
        { label: "Employee Details", path: "/employee/details", icon: <FiUsers size={18} /> }
    ];

    return (
        <div className="mt-6">
            <div className="bg-[#626F47]/35 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="ml-5 mr-5 text-[#FFDAB3] text-sm uppercase font-semibold"> Employee Dashboard </h1>
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link key={item.path} to={item.path} className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${isActive
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

export default EmployeeControl;