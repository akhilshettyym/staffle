import { Tooltip } from "react-tooltip";
import { InfoIcon } from "lucide-react";

const CustomTooltip = ({ message, place = "left", id = "tooltip", iconSize = 18 }) => {

    return (
        <>
            <span data-tooltip-id={id} data-tooltip-content={message} data-tooltip-place={place} className="inline-flex items-center cursor-pointer ml-2 text-[#FFDAB3]/90 hover:text-[#FFDAB3] transition">
                <InfoIcon size={iconSize} />
            </span>

            <Tooltip id={id} className="!normal-case text-sm max-w-xs"
                style={{
                    backgroundColor: "#1B211A",
                    color: "rgba(255, 218, 179, 1.9)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                    zIndex: 999
                }}
                opacity={1} delayShow={200}
            />
        </>
    );
};

export default CustomTooltip;