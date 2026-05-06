import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useSuperAdminEditTaskModal from "../../hooks/SuperAdminHooks/useSuperAdminEditTaskModal";
import { updateNewTask } from "../../api/superadmin";
import toast from "react-hot-toast";

vi.mock("../../api/superadmin", () => ({
    updateNewTask: vi.fn(),
}));

vi.mock("../../hooks/SuperAdminHooks/useSuperAdminGetOrgSpecificEmployeeDetails", () => ({
    default: () => ({
        orgSpecificEmployees: [],
        fetchOrgSpecificEmployees: vi.fn(),
    }),
}));

vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("useSuperAdminEditTaskModal", () => {
    beforeEach(() => {
        localStorage.setItem("orgId", "org-1");
    });

    it("should update task successfully", async () => {
        updateNewTask.mockResolvedValue({ success: true });

        const onClose = vi.fn();
        const fetchTasks = vi.fn();

        const { result } = renderHook(() =>
            useSuperAdminEditTaskModal({
                task: { _id: "task1" },
                onClose,
                fetchTasks,
            })
        );

        await act(async () => {
            result.current.setFormData({
                title: "Task",
                category: "Cat",
                description: "Desc",
                assignedTo: "emp",
                priority: "HIGH",
                dueDate: new Date(),
            });

            await result.current.handleUpdateTask({ preventDefault: () => { } });
        });

        expect(updateNewTask).toHaveBeenCalled();
        expect(fetchTasks).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalled();
    });

    it("should handle error", async () => {
        updateNewTask.mockRejectedValue(new Error("Fail"));

        const { result } = renderHook(() =>
            useSuperAdminEditTaskModal({
                task: { _id: "task1" },
                onClose: vi.fn(),
            })
        );

        await act(async () => {
            await result.current.handleUpdateTask({ preventDefault: () => { } });
        });

        expect(toast.error).toHaveBeenCalled();
    });
});