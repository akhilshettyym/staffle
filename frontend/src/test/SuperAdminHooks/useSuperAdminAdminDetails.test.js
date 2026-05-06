import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useSuperAdminAdminDetails from "../../hooks/SuperAdminHooks/useSuperAdminAdminDetails";
import { deleteAdminEmployee } from "../../api/superadmin";
import toast from "react-hot-toast";

vi.mock("../../api/superadmin", () => ({
    deleteAdminEmployee: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("useSuperAdminAdminDetails", () => {
    it("should remove admin successfully", async () => {
        deleteAdminEmployee.mockResolvedValue({ success: true });

        const refreshAdmins = vi.fn();

        const { result } = renderHook(() =>
            useSuperAdminAdminDetails({ refreshAdmins })
        );

        await act(async () => {
            await result.current.handleRemoveAdmin("emp-1");
        });

        expect(deleteAdminEmployee).toHaveBeenCalledWith({ empId: "emp-1" });
        expect(refreshAdmins).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalled();
    });

    it("should handle error", async () => {
        deleteAdminEmployee.mockRejectedValue(new Error("Fail"));

        const { result } = renderHook(() =>
            useSuperAdminAdminDetails({})
        );

        await act(async () => {
            await result.current.handleRemoveAdmin("emp-1");
        });

        expect(toast.error).toHaveBeenCalled();
    });
});