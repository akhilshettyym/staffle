import { useEffect, useState } from "react";
import { getOrganizationDetails, updateOrganization } from "../../api/organization";
import toast from "react-hot-toast";

const UpdateOrganizationDetails = () => {

    const [loading, setLoading] = useState(false);
    const [organization, setOrganization] = useState({});

    const [formData, setFormData] = useState({
        orgName: "",
        orgCountry: "",
        orgDomain: "",
        orgDescription: ""
    });

    useEffect(() => {
        if (organization) {
            setFormData({
                orgName: organization.orgName || "",
                orgCountry: organization.orgCountry || "",
                orgDomain: organization.orgDomain || "",
                orgDescription: organization.orgDescription || ""
            });
        }
    }, [organization]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateOrganization = async (e) => {

        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {

            if (!formData.orgName?.trim()) {
                throw new Error("Organization Name is required");
            }

            if (!formData.orgCountry?.trim()) {
                throw new Error("Organization Country is required");
            }

            if (!formData.orgDomain?.trim()) {
                throw new Error("Organization Domain is required");
            }

            if (!formData.orgDescription?.trim()) {
                throw new Error("Organization Description is required");
            }

            const payload = {
                orgName: formData.orgName.trim(),
                orgCountry: formData.orgCountry.trim(),
                orgDomain: formData.orgDomain.trim(),
                orgDescription: formData.orgDescription.trim()
            };

            const orgId = organization?._id || organization?.id;

            if (!orgId) {
                throw new Error("Organization Id missing");
            }

            const response = await updateOrganization({ orgId, ...payload });

            if (!response?.success) {
                throw new Error(response?.message || "Failed to update organization");
            }

            toast.success("Organization details updated successfully");
            setOrganization((prev) => ({ ...prev, ...payload }));

        } catch (error) {
            let msg = "Something went wrong while updating organization";

            if (error.response?.data?.message) {
                msg = error.response.data.message;
            } else if (error.message) {
                msg = error.message;
            }

            console.error("Organization updation failed", error);
            toast.error(msg);

        } finally {
            setLoading(false);
        }
    };

    const fetchOrganization = async () => {
        try {
            const orgResponse = await getOrganizationDetails();
            if (!orgResponse?.organization) return;
            setOrganization(orgResponse.organization);

        } catch (error) {
            console.error("Failed to fetch Organization details", error);
            toast.error("Could not fetch organization");
        }
    };

    useEffect(() => {
        fetchOrganization();
    }, []);

    return (
        <div className="pb-10">
            <div className="w-full flex justify-center">

                <form onSubmit={handleUpdateOrganization} className="w-full bg-[#1B211A] p-8 rounded-2xl border border-[#FFDAB3]/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex flex-wrap gap-8">

                    <div className="w-full flex justify-between items-center">
                        <h2 className="text-xl uppercase tracking-wide text-[#FFDAB3]"> Update Organization Details </h2>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Name </label>
                            <input required name="orgName" value={formData.orgName} onChange={handleChange} className="mt-2 w-full text-[#FFDAB3] bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full md:w-[48%] flex flex-col gap-6">
                        <div>
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Domain </label>
                            <input required name="orgDomain" value={formData.orgDomain} onChange={handleChange} className="mt-2 w-full text-[#FFDAB3] bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition" />
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="w-[50%] flex flex-col">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80 flex justify-center"> Organization Country </label>
                            <div className="relative mt-2">
                                <select name="orgCountry" value={formData.orgCountry} onChange={handleChange} className="w-full appearance-none text-[#FFDAB3] bg-[#0F1412] border border-[#FFDAB3]/30 rounded-2xl px-4 py-3 pr-10 outline-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition">
                                    <option value="" disabled>Select organization country</option>
                                    <option value="IN">INDIA</option>
                                    <option value="US">USA</option>
                                    <option value="CA">CANADA</option>
                                    <option value="UK">UNITED KINGDOM</option>
                                </select>
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#FFDAB3]"> ▼ </span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="w-full flex flex-col">
                            <label className="text-md uppercase tracking-wide text-[#FFDAB3]/80"> Organization Description </label>
                            <textarea name="orgDescription" rows="5" value={formData.orgDescription} onChange={handleChange} placeholder="Briefly describe what your organization does" className="bg-[#0F1412] text-[#FFDAB3] border border-[#FFDAB3]/30 rounded-2xl px-4 py-4 outline-none resize-none focus:border-[#FFDAB3] focus:ring-1 focus:ring-[#FFDAB3]/50 transition mt-2" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center pt-2">
                        <button type="submit" disabled={loading} className="bg-[#FFDAB3] text-[#1B211A] font-bold px-12 py-3 rounded-full hover:brightness-110 active:scale-95 transition-all uppercase"> {loading ? "Updating..." : "Update"} </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default UpdateOrganizationDetails;