import { vi, describe, it, expect } from "vitest";
import { reviewRejection } from "../../api/admin";
import { renderHook, act } from "@testing-library/react";
import useAdminRejectRejectionModal from "../../hooks/AdminHooks/useAdminRejectRejectionModal";

vi.mock("../../api/admin", () => ({
    reviewRejection: vi.fn(),
}));

describe("useAdminRejectRejectionModal", () => {
    it("should submit rejection", async () => {
        reviewRejection.mockResolvedValue({});

        const onClose = vi.fn();
        const onSuccess = vi.fn();

        const { result } = renderHook(() =>
            useAdminRejectRejectionModal({
                task: { id: "1" },
                onClose,
                onSuccess,
            })
        );

        const validReason =
            "This is a detailed rejection reason that contains more than fifteen words " +
            "to satisfy the validation logic and allow the submission to proceed correctly.";

        act(() => {
            result.current.handleOnChangeSetReason({
                target: { value: validReason },
            });
        });

        await act(async () => {
            await result.current.handleSubmit();
        });

        expect(reviewRejection).toHaveBeenCalledOnce();
        expect(reviewRejection).toHaveBeenCalledWith({
            taskId: "1",
            decision: "REJECTED",
            adminReason: validReason,
        });
        expect(onClose).toHaveBeenCalledOnce();
        expect(onSuccess).toHaveBeenCalledOnce();
    });
});