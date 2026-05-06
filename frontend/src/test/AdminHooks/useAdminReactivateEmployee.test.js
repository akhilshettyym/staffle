import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import useAdminReactivateEmployee from "../../hooks/AdminHooks/useAdminReactivateEmployee";
import { reactivateEmployee } from "../../api/admin";
import toast from "react-hot-toast";

vi.mock("../../api/admin", () => ({
   reactivateEmployee: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
   default: { success: vi.fn(), error: vi.fn() },
}));

describe("useAdminReactivateEmployee", () => {

   beforeEach(() => vi.clearAllMocks());

   beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { })
    });
    afterEach(() => {
        console.error.mockRestore()
    });

   it("should reactivate employee successfully", async () => {
       reactivateEmployee.mockResolvedValue({ success: true });

       const refreshEmployees = vi.fn();

       const { result } = renderHook(() =>
           useAdminReactivateEmployee({ empId: "1", refreshEmployees })
       );

       await act(async () => {
           await result.current.onHandleReactivate();
       });

       expect(reactivateEmployee).toHaveBeenCalled();
       expect(refreshEmployees).toHaveBeenCalled();
       expect(toast.success).toHaveBeenCalled();
   });

   it("should handle error", async () => {
       reactivateEmployee.mockRejectedValue(new Error("Error"));

       const { result } = renderHook(() =>
           useAdminReactivateEmployee({ empId: "1" })
       );

       await act(async () => {
           await result.current.onHandleReactivate();
       });

       expect(toast.error).toHaveBeenCalled();
   });
});