const useEmployeeTaskDetailsModal = ({ task }) => {

    const failureReason = task?.taskLifeCycle?.failure?.reason;
    const failedAt = task?.taskLifeCycle?.failure?.failedAt;

    const rejectionReason = task?.rejection?.reason;
    const rejectionRequestedAt = task?.rejection?.requestedAt;
    const rejectionStatus = task?.rejection?.status;

    const status = task?.status?.toLowerCase();

    const statusStyles = {
        new: "bg-amber-100 text-amber-700 border-amber-200",
        in_progress: "bg-blue-100 text-blue-700 border-blue-200",
        completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
        failed: "bg-red-100 text-red-700 border-red-200",
        rejection_requested: "bg-orange-100 text-orange-700 border-orange-200",
    };

    return { failureReason, failedAt, rejectionReason, rejectionRequestedAt, rejectionStatus, status, statusStyles };
}

export default useEmployeeTaskDetailsModal;