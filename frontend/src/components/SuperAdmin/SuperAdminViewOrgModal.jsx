const SuperAdminViewOrgModal = ({ org, onClose, allEmployees, allTasks }) => {

    const orgId = org?._id || org?.id;
    const admins = allEmployees?.filter(emp => emp?.organizationId === orgId && emp?.role === "ADMIN") || [];
    const employees = allEmployees?.filter(emp => emp?.organizationId === orgId && emp?.role === "EMPLOYEE") || [];
    const createdByAdmin = allEmployees?.find(emp => (emp?._id || emp?.id) === org?.createdBy);
    const tasks = allTasks?.filter(task => task?.organizationId === orgId) || [];

    const tasksCount = tasks.length;

    const getCountryName = (code) => {
        const map = {
            IN: "INDIA",
            US: "UNITED STATES",
            UK: "UNITED KINGDOM",
            CA: "CANADA"
        };
        return map[code?.toUpperCase()] || code;
    };

    const Row = ({ label, value }) => (
        <div className="flex justify-between text-sm">
            <span className="text-[#F8F8F2]/60"> {label} </span>
            <span className="text-[#FFDAB3] font-semibold text-right"> {value} </span>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="w-[92%] max-w-4xl bg-[#1B211A] rounded-2xl border border-[#FFDAB3]/30 shadow-2xl">

                <div className="flex justify-between items-center px-5 py-4 border-b border-[#FFDAB3]/20">
                    <div>
                        <h2 className="text-xl font-bold text-[#FFDAB3] uppercase"> {org?.orgName} </h2>
                        <p className="text-sm text-[#F8F8F2]/60"> {org?.orgDomain} </p>
                    </div>

                    <button onClick={onClose} className="text-[#FFDAB3] hover:text-red-400 text-lg font-bold"> ✕ </button>
                </div>

                <div className="p-5 space-y-4">

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-3">
                            <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Admins </p>
                            <p className="text-xl text-[#FFDAB3] font-bold"> {admins.length} </p>
                        </div>

                        <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-3">
                            <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Employees </p>
                            <p className="text-xl text-[#FFDAB3] font-bold"> {employees.length} </p>
                        </div>

                        <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-lg p-3">
                            <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Tasks </p>
                            <p className="text-xl text-[#FFDAB3] font-bold"> {tasksCount} </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-lg p-3 space-y-2">
                            <p className="text-sm text-[#FFDAB3] font-semibold uppercase"> Organization </p>
                            <Row label="Country" value={getCountryName(org?.orgCountry)} />
                            <Row label="Status" value={org?.status} />
                            <Row label="Created" value={new Date(org?.createdAt).toLocaleDateString()} />
                            <Row label="Org ID" value={orgId} />
                        </div>

                        {createdByAdmin && (
                            <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-lg p-3 space-y-2">
                                <p className="text-sm text-[#FFDAB3] font-semibold uppercase"> Admin </p>
                                <Row label="Name" value={`${createdByAdmin?.firstName} ${createdByAdmin?.lastName}`} />
                                <Row label="Email" value={createdByAdmin?.email} />
                                <Row label="Designation" value={createdByAdmin?.designation} />
                                <Row label="Status" value={createdByAdmin?.employmentStatus} />
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="text-[10px] text-[#F8F8F2]/60 uppercase mb-1"> Description </p>
                        <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-lg p-3 text-[#FFDAB3] text-sm">
                            {org?.orgDescription || "No description provided"}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SuperAdminViewOrgModal;