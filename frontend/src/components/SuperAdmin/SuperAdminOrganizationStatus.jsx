import { useEffect } from "react";
import useAllOrganizationDetails from "../../utils/superAdminDashboard/useAllOrganizationDetails";

const SuperAdminOrganizationStatus = () => {

    const { allOrganization, fetchAllOrganization } = useAllOrganizationDetails();

    const approvedOrganizations = allOrganization?.filter(org => org?.status === "ACTIVE") || [];
    const rejectedOrganizations = allOrganization?.filter(org => org?.status === "REJECTED") || [];
    const revokedOrganizations = allOrganization?.filter(org => org?.status === "REVOKED") || [];
    const pendingOrganizations = allOrganization?.filter(org => org?.status === "PENDING") || [];

    useEffect(() => {
        fetchAllOrganization();
    }, []);

    return (
        <div className="flex flex-wrap mt-6 gap-5">
            <StatusCard value={approvedOrganizations.length} label="Approved Orgs." />
            <StatusCard value={rejectedOrganizations.length} label="Rejected Orgs." />
            <StatusCard value={revokedOrganizations.length} label="Revoked Orgs." />
            <StatusCard value={pendingOrganizations.length} label="Pending Approval" />
        </div>
    );
};

const StatusCard = ({ value, label }) => {
    return (
        <div className="flex-1 min-w-60 bg-linear-to-br from-[#1B211A] to-[#151A14] border border-[#FFDAB3]/20 rounded-2xl px-5 py-4 shadow-md hover:shadow-lg hover:border-[#FFDAB3]/40 transition-all duration-200 flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-[#FFDAB3]"> {value} </h2>

            <p className="text-[#F8F8F2]/70 text-sm font-semibold tracking-wide"> {label} </p>
        </div>
    );
};

export default SuperAdminOrganizationStatus;