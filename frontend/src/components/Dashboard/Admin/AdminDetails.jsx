import { useState, useEffect, Header, AdminControl, toast } from "../../../constants/imports";

const MAX_ATTEMPTS = 3;
const LOCK_TIME = 5 * 60 * 1000;

const inputClass = "mt-2 w-full appearance-none bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 text-[#FFDAB3] outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition";

const disabledInput = `${inputClass} opacity-60 cursor-not-allowed`;

const AdminDetails = ({ data, handleLogout, orgData }) => {
    const [taskbridge, setTaskbridge] = useState(
        JSON.parse(localStorage.getItem("taskbridge"))
    );

    const admin = taskbridge?.admin;
    const organization = taskbridge?.organization;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        currentPassword: "",
        newPassword: "",
    });

    const [orgForm, setOrgForm] = useState({
        name: "",
        category: "",
        description: "",
    });

    const [lockInfo, setLockInfo] = useState(null);

    useEffect(() => {
        if (!admin || !organization) return;

        setFormData({
            firstName: admin.firstName || "",
            lastName: admin.lastName || "",
            currentPassword: "",
            newPassword: "",
        });

        setOrgForm({
            name: organization.name || "",
            category: organization.category || "",
            description: organization.description || "",
        });

        const lock = JSON.parse(
            localStorage.getItem(`pwd-lock-${admin.id}`)
        );
        setLockInfo(lock);
    }, [admin, organization]);

    const isLocked = () =>
        lockInfo && Date.now() < lockInfo.lockUntil;

    const recordFailedAttempt = () => {
        const attempts = (lockInfo?.attempts || 0) + 1;

        if (attempts >= MAX_ATTEMPTS) {
            const lock = {
                attempts,
                lockUntil: Date.now() + LOCK_TIME,
            };
            localStorage.setItem(
                `pwd-lock-${admin.id}`,
                JSON.stringify(lock)
            );
            setLockInfo(lock);
            toast.error("Too many wrong attempts. Locked for 5 minutes.");
        } else {
            const lock = { attempts };
            localStorage.setItem(
                `pwd-lock-${admin.id}`,
                JSON.stringify(lock)
            );
            setLockInfo(lock);
            toast.error(`Wrong password (${attempts}/3)`);
        }
    };

    const clearLock = () => {
        localStorage.removeItem(`pwd-lock-${admin.id}`);
        setLockInfo(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLocked()) {
            toast.error("Password update locked. Try again later.");
            return;
        }

        if (!formData.currentPassword) {
            toast.error("Current password is required");
            return;
        }

        if (formData.currentPassword !== admin.password) {
            recordFailedAttempt();
            return;
        }

        clearLock();

        const updatedAdmin = {
            ...admin,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
        };

        let passwordChanged = false;

        if (formData.newPassword) {
            updatedAdmin.password = formData.newPassword;
            passwordChanged = true;
        }

        const updatedOrganization = {
            ...organization,
            name: orgForm.name.trim(),
            category: orgForm.category.trim(),
            description: orgForm.description.trim(),
        };

        const updatedStore = {
            ...taskbridge,
            admin: updatedAdmin,
            organization: updatedOrganization,
        };

        localStorage.setItem("taskbridge", JSON.stringify(updatedStore));
        setTaskbridge(updatedStore);

        toast.success("Details updated successfully");

        if (passwordChanged) {
            toast("Password changed. Please login again.");
            handleLogout();
        }
    };

    return (
        <div className="h-screen w-full p-10 overflow-auto">
            <Header data={admin} handleLogout={handleLogout} orgData={organization} />
            <AdminControl />

            <hr className="my-5 border border-[#FFDAB3]/40" />
            <h1 className="text-center font-bold text-[#FFDAB3] text-xl uppercase"> Admin Details </h1>
            <hr className="my-5 border border-[#FFDAB3]/40" />

            <div className="bg-[#1B211A] p-4 rounded-2xl border border-[#FFDAB3]/30 mb-6 flex items-center text-sm text-[#FFDAB3]">
                <div className="w-1/3 text-left uppercase font-semibold"> ID : <span className="font-semibold">{admin?.id}</span></div>
                <div className="w-1/3 text-center text-md"> Email :{" "}<span className="font-semibold lowercase"> {admin?.email} </span></div>
                <div className="w-1/3 text-right uppercase font-semibold"> Org ID : <span className="font-semibold">{organization?.id}</span></div>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#1B211A] p-6 rounded-2xl border border-[#FFDAB3]/40 flex flex-wrap gap-6">
                <div className="w-full md:w-[48%]">
                    <label className="uppercase text-[#FFDAB3]/80">First Name</label>
                    <input className={inputClass} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />

                    <label className="mt-4 block uppercase text-[#FFDAB3]/80"> Email </label>
                    <input disabled value={admin?.email} className={disabledInput} />

                    <label className="mt-4 block uppercase text-[#FFDAB3]/80"> Current Password * </label>
                    <input type="password" className={inputClass} value={formData.currentPassword} onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })} />
                </div>

                <div className="w-full md:w-[48%]">
                    <label className="uppercase text-[#FFDAB3]/80">Last Name</label>
                    <input className={inputClass} value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />

                    <label className="mt-4 block uppercase text-[#FFDAB3]/80"> New Password (optional) </label>
                    <input type="password" className={inputClass} value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} />
                </div>

                <div className="w-full border-t border-[#FFDAB3]/30 pt-6">
                    <h2 className="text-[#FFDAB3] font-bold uppercase mb-4"> Organization Details </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="uppercase text-[#FFDAB3]/80">Name</label>
                            <input className={inputClass} value={orgForm.name} onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })} />
                        </div>

                        <div>
                            <label className="uppercase text-[#FFDAB3]/80">Category</label>
                            <input className={inputClass} value={orgForm.category} onChange={(e) => setOrgForm({ ...orgForm, category: e.target.value })} />
                        </div>

                        <div>
                            <label className="uppercase text-[#FFDAB3]/80"> Created At </label>
                            <input disabled value={organization?.createdAt} className={disabledInput} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="uppercase text-[#FFDAB3]/80">Description</label>
                        <textarea rows={3} className={inputClass} value={orgForm.description} onChange={(e) => setOrgForm({ ...orgForm, description: e.target.value })} />
                    </div>
                </div>

                <div className="w-full flex justify-center pt-6">
                    <button type="submit" className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full uppercase"> Update Details </button>
                </div>
            </form>
        </div>
    );
};

export default AdminDetails;