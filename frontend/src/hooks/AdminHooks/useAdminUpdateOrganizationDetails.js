import { useEffect, useState } from "react";
import { updateOrganization } from "../../api/organization";
import toast from "react-hot-toast";
import useOrganizationDetails from "../../utils/useOrganizationDetails";

const useAdminUpdateOrganizationDetails = ({ refreshOrgData }) => {

    const [loading, setLoading] = useState(false);

    const { organization, setOrganization, fetchOrganization } = useOrganizationDetails();

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
            refreshOrgData();
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

    return { loading, formData, setOrganization, handleChange, handleUpdateOrganization, fetchOrganization };
}

export default useAdminUpdateOrganizationDetails;