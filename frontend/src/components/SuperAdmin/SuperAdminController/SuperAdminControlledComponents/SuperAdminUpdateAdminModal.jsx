import AdminUpdateAdminDetails from "../../../Admin/AdminUpdateAdminDetails";

const SuperAdminUpdateAdminModal = ({ admin, onClose }) => {

    if (!admin) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-300 max-w-[95vw] bg-[#1B211A] border border-[#FFDAB3]/30 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[#FFDAB3] text-xl font-semibold uppercase"> Update Admin Details </h2>

                    <button onClick={onClose} className="text-[#FFDAB3] hover:text-white text-lg"> ✕ </button>
                </div>

                <AdminUpdateAdminDetails admin={admin} refreshAdminData={onClose} />
            </div>
        </div>
    );
};

export default SuperAdminUpdateAdminModal;