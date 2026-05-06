import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

import useSuperAdminCreateTaskForm from "../../hooks/SuperAdminHooks/useSuperAdminCreateTaskForm";
import { createNewTask } from "../../api/superadmin";
import toast from "react-hot-toast";

vi.mock("../../api/superadmin", () => ({
    createNewTask: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("../../hooks/SuperAdminHooks/useSuperAdminGetOrgSpecificEmployeeDetails", () => ({
    default: () => ({
        orgSpecificEmployees: [],
        fetchOrgSpecificEmployees: vi.fn(),
    }),
}));

describe("useSuperAdminCreateTaskForm", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        Storage.prototype.getItem = vi.fn(() => "org123");
    });

    it("should create task successfully", async () => {

        createNewTask.mockResolvedValue({
            success: true,
            message: "Task created successfully",
        });

        const { result } = renderHook(() => useSuperAdminCreateTaskForm());

        act(() => {
            result.current.setDueDate(new Date("2026-01-01"));
        });

        const form = document.createElement("form");

        form.innerHTML = `
           <input name="title" value="Task 1" />
           <input name="category" value="Bug" />
           <input name="description" value="Fix this issue properly" />
           <input name="assignedTo" value="emp1" />
           <input name="priority" value="HIGH" />
       `;

        await act(async () => {
            await result.current.handleCreateTask({
                preventDefault: vi.fn(),
                target: form,
            });
        });

        expect(createNewTask).toHaveBeenCalledWith({
            orgId: "org123",
            payload: expect.objectContaining({
                title: "Task 1",
                category: "Bug",
                description: "Fix this issue properly",
                assignedTo: "emp1",
                priority: "HIGH",
                dueDate: expect.any(String),
            }),
        });

        expect(toast.success).toHaveBeenCalled();
    });

    it("should show error if required fields are missing", async () => {

        const { result } = renderHook(() => useSuperAdminCreateTaskForm());

        const form = document.createElement("form");

        form.innerHTML = `
           <input name="title" value="" />
       `;

        await act(async () => {
            await result.current.handleCreateTask({
                preventDefault: vi.fn(),
                target: form,
            });
        });

        expect(createNewTask).not.toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith("Please fill all required fields");
    });
});