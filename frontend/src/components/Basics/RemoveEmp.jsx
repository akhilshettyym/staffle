import { useState, ConfirmModal } from "../../constants/imports";

const RemoveEmp = ({ onDelete }) => {

    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <button onClick={() => setShowConfirm(true)} className="py-1 px-4 text-sm rounded-md bg-red-500 border-2 font-semibold border-red-600 text-[#FFDAB3] hover:bg-red-600 transition"> Remove </button>

            <ConfirmModal isOpen={showConfirm} title="Remove Employee" message="Are you sure you want to Remove this Employee ? This action cannot be undone." onCancel={() => setShowConfirm(false)} onConfirm={onDelete} btnTitle={"Remove"} />
        </>
    );
};
export default RemoveEmp;