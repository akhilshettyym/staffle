import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import useHook from "../../hooks/SuperAdminHooks/useSuperAdminGetOrgSpecificOrganizationDetails";
import { getSpecificOrganizationDetails } from "../../api/superadmin";

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