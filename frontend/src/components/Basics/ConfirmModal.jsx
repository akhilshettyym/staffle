const ConfirmModal = ({ isOpen, title = "Are you sure?", message = "This action cannot be undone.", onConfirm, onCancel, btnTitle }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />

      <div className="relative z-10 w-[420px] rounded-2xl bg-[#1B211A] border-2 border-[#FFDAB3]/40 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-[#FFDAB3] mb-3"> {title} </h2>

        <p className="text-[#A7C1A8] mb-6"> {message} </p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-1 rounded-md border border-[#EEEFE0]/40 text-[#FFDAB3] hover:bg-[#2A3328]"> Cancel </button>
          <button onClick={onConfirm} className="px-4 py-1 rounded-md bg-red-500 border border-red-600 text-[#FFDAB3] hover:bg-red-600"> {btnTitle} </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;