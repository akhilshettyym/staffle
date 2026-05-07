import { vi, describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { getSpecificOrganizationDetails } from "../../api/superadmin";
import useHook from "../../hooks/SuperAdminHooks/useSuperAdminGetOrgSpecificOrganizationDetails";

vi.mock("../../api/superadmin", () => ({
    getSpecificOrganizationDetails: vi.fn(),
}));

describe("useSuperAdminGetOrgSpecificOrganizationDetails", () => {

    it("should fetch organization", async () => {
        getSpecificOrganizationDetails.mockResolvedValue({
            organization: {},
        });

        const { result } = renderHook(() =>
            useHook({ orgId: "1" })
        );

        await act(async () => {
            await result.current.fetchSpecificOrganization(true);
        });

        expect(getSpecificOrganizationDetails).toHaveBeenCalled();
    });
});