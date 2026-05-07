import { vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useAdminEditTaskModal from '../../hooks/AdminHooks/useAdminEditTaskModal';

vi.mock('../../api/admin', () => ({
    updateTask: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

const mockDispatch = vi.fn()
vi.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
}))

vi.mock('../../utils/useEmployeesDetails', () => ({
    default: () => ({
        employees: [],
        fetchEmployees: vi.fn(),
    }),
}))

import toast from 'react-hot-toast';
import { updateTask } from '../../api/admin';

describe('useAdminEditTaskModal', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should update task successfully', async () => {

        updateTask.mockResolvedValue({
            success: true,
            task: { id: '1', title: 'Updated Task' },
        })

        const onClose = vi.fn()
        const onTaskUpdated = vi.fn()

        const mockTask = {
            _id: '1',
            title: 'Old Task',
            category: 'Dev',
            description: 'desc',
            priority: 'Medium',
            assignedTo: 'emp1',
            dueDate: new Date().toISOString(),
        }

        const { result } = renderHook(() =>
            useAdminEditTaskModal({
                task: mockTask,
                onClose,
                onTaskUpdated,
            })
        )

        act(() => {
            result.current.handleChange({
                target: { name: 'title', value: 'Updated Task' },
            })
            result.current.handleChange({
                target: { name: 'category', value: 'Development' },
            })
        })

        act(() => {
            result.current.handleDateChange(new Date(Date.now() + 86400000))
        })

        const event = {
            preventDefault: vi.fn(),
        }

        await act(async () => {
            await result.current.handleUpdateTask(event)
        })

        expect(updateTask).toHaveBeenCalled()
        expect(toast.success).toHaveBeenCalled()
        expect(onTaskUpdated).toHaveBeenCalled()
        expect(onClose).toHaveBeenCalled()
    })
})