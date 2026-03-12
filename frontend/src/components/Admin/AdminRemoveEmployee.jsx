import { ConfirmModal } from "../../constants/imports";
import useAdminRemoveEmployee from "../../hooks/useAdminRemoveEmployee";

const AdminRemoveEmployee = ({ empId }) => {

    const { loading, showConfirm, setShowConfirm, onHandleRemove } = useAdminRemoveEmployee({ empId });

    return (
        <>
            <button onClick={() => setShowConfirm(true)} className="py-1 px-4 text-sm rounded-md bg-red-500 border font-semibold border-red-600 text-[#FFDAB3] hover:bg-red-600 transition"> Remove </button>

            <ConfirmModal isOpen={showConfirm} title="Remove Employee" disabled={loading} message="Are you sure you want to Remove this Employee ? This action cannot be undone." onCancel={() => !loading && setShowConfirm(false)} onConfirm={onHandleRemove} btnTitle={loading ? "Removing..." : "Remove"} />
        </>
    );
};
export default AdminRemoveEmployee;