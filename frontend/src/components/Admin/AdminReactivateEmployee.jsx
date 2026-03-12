import { ConfirmModal } from "../../constants/imports";
import useAdminReactivateEmployee from "../../hooks/useAdminReactivateEmployee";

const AdminReactivateEmployee = ({ empId }) => {

    const { loading, showConfirm, setShowConfirm, onHandleReactivate } = useAdminReactivateEmployee({ empId });

    return (
        <>
            <button onClick={() => setShowConfirm(true)} className="py-1 px-5 text-sm rounded-md bg-green-500 border font-semibold border-green-600 text-[#FFDAB3] hover:bg-green-600 transition whitespace-nowrap"> Re-activate </button>

            <ConfirmModal isOpen={showConfirm} title="Re-activate Employee" disabled={loading} message="Are you sure you want to Reactivate this Employee ?" onCancel={() => !loading && setShowConfirm(false)} onConfirm={onHandleReactivate} btnTitle={loading ? "Re-activating..." : "Re-activate"} confirmBtnClass="bg-green-600 border-green-600 hover:bg-green-700" />
        </>
    );
};

export default AdminReactivateEmployee;