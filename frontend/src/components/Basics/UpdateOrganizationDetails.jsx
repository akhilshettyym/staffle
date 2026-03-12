import { useEffect } from "react";
import useUpdateOrganizationDetails from "../../hooks/useUpdateOrganizationDetails";

const UpdateOrganizationDetails = () => {

    const { loading, formData, handleChange, handleUpdateOrganization, fetchOrganization } = useUpdateOrganizationDetails();

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
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#FFDAB3]"> ↓ </span>
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