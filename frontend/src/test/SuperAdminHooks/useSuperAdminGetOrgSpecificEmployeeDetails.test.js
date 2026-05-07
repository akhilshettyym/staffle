import { vi, describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { getOrganizationSpecificEmployeeDetails } from "../../api/superadmin";
import useHook from "../../hooks/SuperAdminHooks/useSuperAdminGetOrgSpecificEmployeeDetails";

vi.mock("../../api/superadmin", () => ({
    getOrganizationSpecificEmployeeDetails: vi.fn(),
}));

describe("useSuperAdminGetOrgSpecificEmployeeDetails", () => {

    it("should fetch employees", async () => {
        getOrganizationSpecificEmployeeDetails.mockResolvedValue({
            employees: [],
        });

        const { result } = renderHook(() =>
            useHook({ orgId: "1" })
        );

        await act(async () => {
            await result.current.fetchOrgSpecificEmployees(true);
        });

        expect(getOrganizationSpecificEmployeeDetails).toHaveBeenCalled();
    });
});