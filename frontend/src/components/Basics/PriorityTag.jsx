const PriorityTag = ({ priorityMsg }) => {

    if (priorityMsg === "High") {
        return (
            <span className="flex items-center gap-2 text-xs px-4 py-1 rounded-full bg-[#FFDAB3]/15 text-[#FFDAB3] uppercase tracking-wide">
                <span className="h-3 w-3 rounded-full bg-red-500"></span> High </span>
        );
    }

    if (priorityMsg === "Medium") {
        return (
            <span className="flex items-center gap-2 text-xs px-4 py-1 rounded-full bg-[#FFDAB3]/15 text-[#FFDAB3] uppercase tracking-wide">
                <span className="h-3 w-3 rounded-full bg-orange-500"></span> Medium </span>
        );
    }

    if (priorityMsg === "Low") {
        return (
            <span className="flex items-center gap-2 text-xs px-4 py-1 rounded-full bg-[#FFDAB3]/15 text-[#FFDAB3] uppercase tracking-wide">
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span> Low </span>
        );
    }

    return null;
};

export default PriorityTag;