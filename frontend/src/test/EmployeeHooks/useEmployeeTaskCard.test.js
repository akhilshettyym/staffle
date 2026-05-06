import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useEmployeeTaskCard from '../../hooks/EmployeeHooks/useEmployeeTaskCard';

vi.mock('../../api/employee', () => ({
    acceptTask: vi.fn(),
    markAsCompleted: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

vi.mock('react-redux', () => ({
    useSelector: (fn) =>
        fn({
            auth: {
                user: { firstName: 'John', lastName: 'Doe' },
            },
        }),
}))

import { acceptTask, markAsCompleted } from '../../api/employee';
import toast from 'react-hot-toast';

describe('useEmployeeTaskCard', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })
    
    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { })
    })
    afterEach(() => {
        console.error.mockRestore()
    })

    const task = { _id: '1' }

    it('should accept task successfully', async () => {
        acceptTask.mockResolvedValue({ success: true })

        const onChange = vi.fn()

        const { result } = renderHook(() =>
            useEmployeeTaskCard({ task, onTaskStatusChange: onChange })
        )

        await act(async () => {
            await result.current.handleAcceptTask()
        })

        expect(acceptTask).toHaveBeenCalledWith('1')
        expect(toast.success).toHaveBeenCalled()
        expect(onChange).toHaveBeenCalledWith('1', 'IN_PROGRESS')
    })

    it('should mark task as completed', async () => {
        markAsCompleted.mockResolvedValue({ success: true })

        const onChange = vi.fn()

        const { result } = renderHook(() =>
            useEmployeeTaskCard({ task, onTaskStatusChange: onChange })
        )

        await act(async () => {
            await result.current.handleMarkAsCompleted()
        })

        expect(markAsCompleted).toHaveBeenCalledWith('1')
        expect(onChange).toHaveBeenCalledWith('1', 'COMPLETED')
    })

    it('should handle reject task locally', () => {
        const onChange = vi.fn()

        const { result } = renderHook(() =>
            useEmployeeTaskCard({ task, onTaskStatusChange: onChange })
        )

        act(() => {
            result.current.handleRejectTask('Not possible')
        })

        expect(onChange).toHaveBeenCalledWith('1', 'FAILED', 'Not possible')
    })

    it('should handle API failure', async () => {
        acceptTask.mockRejectedValue(new Error('fail'))

        const { result } = renderHook(() =>
            useEmployeeTaskCard({ task })
        )

        await act(async () => {
            await result.current.handleAcceptTask()
        })

        expect(toast.error).toHaveBeenCalled()
    })
})