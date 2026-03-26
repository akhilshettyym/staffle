import { useEffect } from "react";
import useAllOrganizationDetails from "../../utils/superAdminDashboard/useAllOrganizationDetails";
import useAllEmployeeDetails from "../../utils/superAdminDashboard/useAllEmployeeDetails";
import useAllTasksDetails from "../../utils/superAdminDashboard/useAllTasksDetails";
import { Building2, ShieldCheck, Users, ClipboardList } from "lucide-react";

const SuperAdminTotalCount = () => {

    const { allOrganization, fetchAllOrganization } = useAllOrganizationDetails();
    const { allEmployees, fetchAllEmployees } = useAllEmployeeDetails();
    const { allTasks, fetchAllTasks } = useAllTasksDetails();

    const admins = allEmployees.filter(emp => emp?.role === "ADMIN");
    const employees = allEmployees.filter(emp => emp?.role === "EMPLOYEE");

    useEffect(() => {
        fetchAllOrganization();
        fetchAllEmployees();
        fetchAllTasks();
    }, []);

    const StatCard = ({ value, label, Icon }) => {
        return (
            <div className="flex-1 min-w-56 bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 shadow-md flex items-center justify-between hover:border-[#FFDAB3]/50 transition-all">

                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#FFDAB3]/10">
                        <Icon size={18} className="text-[#FFDAB3]" />
                    </div>

                    <span className="text-[#F8F8F2]/80 text-sm font-medium"> {label} </span>
                </div>

                <span className="text-2xl font-semibold text-[#FFDAB3]"> {value} </span>
            </div>
        );
    };

    return (
        <div className="flex flex-wrap mt-5 gap-4">
            <StatCard value={allOrganization?.length || 0} label="Organizations" Icon={Building2} />
            <StatCard value={admins?.length || 0} label="Admins" Icon={ShieldCheck} />
            <StatCard value={employees?.length || 0} label="Employees" Icon={Users} />
            <StatCard value={allTasks?.length || 0} label="Tasks" Icon={ClipboardList} />
        </div>
    )
}

export default SuperAdminTotalCount;