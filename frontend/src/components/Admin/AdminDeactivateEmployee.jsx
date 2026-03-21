import { ConfirmModal } from "../../constants/imports";
import useAdminDeactivateEmployee from "../../hooks/adminHooks/useAdminDeactivateEmployee";

const AdminDeactivateEmployee = ({ empId, onClose, refreshEmployees }) => {

    const { loading, showConfirm, setShowConfirm, onHandleRemove } = useAdminDeactivateEmployee({ empId, refreshEmployees, onClose });

    return (
        <>
            <button onClick={() => setShowConfirm(true)} className="py-1 px-5 text-sm rounded-md bg-red-500 border font-semibold border-red-600 text-[#FFDAB3] hover:bg-red-600 transition whitespace-nowrap"> Deactivate </button>

            <ConfirmModal isOpen={showConfirm} title="Remove Employee" disabled={loading} message="Are you sure you want to deactivate this Employee ? This action cannot be undone." onCancel={() => !loading && setShowConfirm(false)} onConfirm={onHandleRemove} btnTitle={loading ? "Deactivating..." : "Deactivate"} confirmBtnClass="bg-red-500 border-red-600 hover:bg-red-600" />
        </>
    );
};

export default AdminDeactivateEmployee;