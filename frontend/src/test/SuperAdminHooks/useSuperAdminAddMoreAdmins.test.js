import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useSuperAdminAddMoreAdmins from "../../hooks/SuperAdminHooks/useSuperAdminAddMoreAdmins";
import { addAdmin } from "../../api/superadmin";
import toast from "react-hot-toast";

vi.mock("../../api/superadmin", () => ({
    addAdmin: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("useSuperAdminAddMoreAdmins", () => {
    beforeEach(() => {
        localStorage.setItem("orgId", "org-123");
        vi.clearAllMocks();
    });

    it("should add admin successfully", async () => {
        addAdmin.mockResolvedValue({ success: true, message: "Added" });

        const refreshAdmins = vi.fn();
        const onAdded = vi.fn();

        const { result } = renderHook(() =>
            useSuperAdminAddMoreAdmins({ refreshAdmins, onAdded })
        );

        const form = document.createElement("form");
        form.innerHTML = `
     <input name="firstName" value="John"/>
     <input name="lastName" value="Doe"/>
     <input name="email" value="john@test.com"/>
     <input name="password" value="123456"/>
     <input name="dateOfBirth" value="2000-01-01"/>
     <input name="designation" value="Admin"/>
   `;

        await act(async () => {
            await result.current.handleAddAdmin({ preventDefault: () => { }, target: form });
        });

        expect(addAdmin).toHaveBeenCalled();
        expect(refreshAdmins).toHaveBeenCalled();
        expect(onAdded).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalled();
    });

    it("should handle error", async () => {
        addAdmin.mockRejectedValue(new Error("Failed"));

        const { result } = renderHook(() =>
            useSuperAdminAddMoreAdmins({})
        );

        const form = document.createElement("form");

        await act(async () => {
            await result.current.handleAddAdmin({ preventDefault: () => { }, target: form });
        });

        expect(toast.error).toHaveBeenCalled();
    });
});