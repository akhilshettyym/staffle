import { reviewRejection } from "../../api/admin";
import { vi, describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useAdminTaskDetailsModal from "../../hooks/AdminHooks/useAdminTaskDetailsModal";

vi.mock("../../api/admin", () => ({
    reviewRejection: vi.fn(),
}));

describe("useAdminTaskDetailsModal", () => {

    it("should approve rejection request", async () => {
        reviewRejection.mockResolvedValue({});

        const fetchTasksDetails = vi.fn();
        const onClose = vi.fn();

        const { result } = renderHook(() =>
            useAdminTaskDetailsModal({
                task: { id: "1", status: "REJECTION_REQUESTED" },
                onClose,
                fetchTasksDetails,
            })
        );

        await act(async () => {
            await result.current.handleApprove();
        });

        expect(reviewRejection).toHaveBeenCalled();
        expect(fetchTasksDetails).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    });
});