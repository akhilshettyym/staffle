import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import useHook from "../../hooks/SuperAdminHooks/useSuperAdminGetOrgSpecificEmployeeDetails";
import { getOrganizationSpecificEmployeeDetails } from "../../api/superadmin";

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