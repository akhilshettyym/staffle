import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordToggle = ({ id, name = "password", value, onChange, onBlur, placeholder, className = "", required = true, iconClassName = "" }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <input id={id} name={name} onBlur={onBlur} type={showPassword ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} required={required} autoComplete="current-password" className={className} />

            <button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? "Hide password" : "Show password"}
                className={` absolute right-3 top-1/2 -translate-y-1/2 text-[#FFDAB3]/70 hover:text-[#FFDAB3] transition ${iconClassName} `} >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
};
export default PasswordToggle;