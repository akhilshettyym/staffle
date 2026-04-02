const SuperAdminViewOrganization = ({ specificOrganization, admins = [], employees = [], orgSpecificEmployees = [], createdByAdmin }) => {

    const getCountryName = (code) => {
        const map = {
            IN: "INDIA",
            US: "UNITED STATES",
            UK: "UNITED KINGDOM",
            CA: "CANADA",
        };
        return map[code?.toUpperCase()] || code;
    };

    const Row = ({ label, value }) => (
        <div className="flex justify-between items-center text-sm py-1">
            <span className="text-[#F8F8F2]/60"> {label} </span>
            <span className="text-[#FFDAB3] font-semibold text-right"> {value || "-"} </span>
        </div>
    );

    if (!specificOrganization) {
        return (
            <div className="text-center py-10 text-[#FFDAB3]/70"> Loading organization... </div>
        );
    }

    return (
        <div className="mt-2 space-y-5">

            <div className="flex justify-between items-center px-2 border-b border-[#FFDAB3]/20 pb-3">
                <div>
                    <h2 className="text-2xl font-bold text-[#FFDAB3] uppercase tracking-wide"> {specificOrganization?.orgName} </h2>

                    <p className="text-sm text-[#F8F8F2]/60 mt-1"> {specificOrganization?.orgDomain} </p>
                </div>

                <div className="text-right">
                    <p className="text-[12px] text-[#F8F8F2]/60 uppercase"> Organization ID </p>
                    <p className="text-sm text-[#FFDAB3]"> {specificOrganization?._id} </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-xl p-4">
                    <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Admins </p>
                    <p className="text-2xl text-[#FFDAB3] font-bold mt-1"> {admins.length} </p>
                </div>

                <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-xl p-4">
                    <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Employees </p>
                    <p className="text-2xl text-[#FFDAB3] font-bold mt-1"> {employees.length} </p>
                </div>

                <div className="bg-[#2C3930]/30 border border-[#FFDAB3]/20 rounded-xl p-4">
                    <p className="text-[10px] text-[#F8F8F2]/60 uppercase"> Total Members </p>
                    <p className="text-2xl text-[#FFDAB3] font-bold mt-1"> {orgSpecificEmployees?.length || 0} </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-xl p-5 space-y-2">
                    <p className="text-sm text-[#FFDAB3] font-semibold uppercase mb-2"> Organization Info </p>
                    <Row label="Country" value={getCountryName(specificOrganization?.orgCountry)} />
                    <Row label="Status" value={specificOrganization?.status} />
                    <Row label="Created" value={specificOrganization?.createdAt && new Date(specificOrganization.createdAt).toLocaleDateString()} />
                    <Row label="Domain" value={specificOrganization?.orgDomain} />
                </div>

                {createdByAdmin && (
                    <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-xl p-5 space-y-2">
                        <p className="text-sm text-[#FFDAB3] font-semibold uppercase mb-2"> Created By Admin </p>
                        <Row label="Name" value={`${createdByAdmin?.firstName} ${createdByAdmin?.lastName}`} />
                        <Row label="Email" value={createdByAdmin?.email} />
                        <Row label="Designation" value={createdByAdmin?.designation} />
                        <Row label="Status" value={createdByAdmin?.employmentStatus} />
                    </div>
                )}
            </div>

            <div>
                <p className="text-[12px] text-[#F8F8F2]/60 uppercase mb-2"> Description </p>

                <div className="bg-[#2C3930]/20 border border-[#FFDAB3]/20 rounded-xl p-4 text-[#FFDAB3] text-sm leading-relaxed">
                    {specificOrganization?.orgDescription || "No description provided"}
                </div>
            </div>

        </div>
    );
};

export default SuperAdminViewOrganization;