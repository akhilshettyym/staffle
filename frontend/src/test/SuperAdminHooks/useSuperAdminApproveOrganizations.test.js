import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useSuperAdminApproveOrganizations from "../../hooks/SuperAdminHooks/useSuperAdminApproveOrganizations";
import { approveOrganization, rejectOrganization } from "../../api/superadmin";
import toast from "react-hot-toast";

vi.mock("../../api/superadmin", () => ({
    approveOrganization: vi.fn(),
    rejectOrganization: vi.fn(),
}));

vi.mock("../../utils/useAllEmployeeDetails", () => ({
    default: () => ({
        allEmployees: [],
        fetchAllEmployees: vi.fn(),
    }),
}));

vi.mock("../../utils/useAllOrganizationDetails", () => ({
    default: () => ({
        allOrganization: [{ _id: "1", status: "PENDING" }],
        fetchAllOrganization: vi.fn(),
    }),
}));

vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("useSuperAdminApproveOrganizations", () => {
    it("should approve organization", async () => {
        approveOrganization.mockResolvedValue({ message: "Approved" });

        const { result } = renderHook(() =>
            useSuperAdminApproveOrganizations()
        );

        await act(async () => {
            await result.current.handleApprove("org-1");
        });

        expect(approveOrganization).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalled();
    });

    it("should reject organization", async () => {
        rejectOrganization.mockResolvedValue({ message: "Rejected" });

        const { result } = renderHook(() =>
            useSuperAdminApproveOrganizations()
        );

        await act(async () => {
            await result.current.handleReject("org-1");
        });

        expect(rejectOrganization).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalled();
    });
});