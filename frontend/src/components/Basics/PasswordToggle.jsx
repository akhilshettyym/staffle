import { useState, Eye, EyeOff } from "../../constants/imports";

const PasswordToggle = ({ name = "password", value, onChange, placeholder, className = "", required = true, iconClassName = "" }) => {

    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className="relative w-full">
            <input name={name} type={showPassword ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} required={required} className={className} />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? "Hide password" : "Show password"}
                className={` absolute right-3 top-1/2 -translate-y-1/2 text-[#FFDAB3]/70 hover:text-[#FFDAB3] transition ${iconClassName} `} >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
};
export default PasswordToggle;