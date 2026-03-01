const Header = ({ data, handleLogout, orgData }) => {

    if (!data) {
        return <div className="text-white">Loading...</div>
    }

    const firstName = data.firstName
    const lastName = data.lastName
    const renderName = `${firstName} ${lastName}`;

    return (
        <div className="bg-[#1B211A] p-3 rounded-2xl border border-[#FFDAB3] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="ml-5 text-2xl text-[#FFDAB3] font-semibold uppercase"> {orgData?.name ?? "Organization"} </h1>
                <div className="flex items-center gap-6">
                    {renderName && (<h2 className="text-md font-medium text-[#FFDAB3] uppercase"> {renderName} </h2>)}

                    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg text-md font-semibold transition-colors uppercase duration-200"> Logout </button>
                </div>
            </div>
        </div>
    )
}

export default Header;