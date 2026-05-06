import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useEmployeeFailedTaskModal from '../../hooks/EmployeeHooks/useEmployeeFailedTaskModal';

vi.mock('../../api/employee', () => ({
    requestRejection: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

import { requestRejection } from '../../api/employee';
import toast from 'react-hot-toast';

describe('useEmployeeFailedTaskModal', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { })
    })
    afterEach(() => {
        console.error.mockRestore()
    })

    it('should validate reason correctly', () => {
        const { result } = renderHook(() =>
            useEmployeeFailedTaskModal({ taskId: '1' })
        )
        act(() => {
            result.current.setReason('Too short')
        })
        expect(result.current.isValid).toBe(false)
    })

    it('should accept valid reason', () => {
        const { result } = renderHook(() =>
            useEmployeeFailedTaskModal({ taskId: '1' })
        )
        act(() => {
            result.current.setReason(
                `This task has multiple blockers
                Backend services are failing and dependencies are not responding properly`
            )
        })
        expect(result.current.isValid).toBe(true)
    })

    it('should submit rejection successfully', async () => {
        requestRejection.mockResolvedValue({
            message: 'Request sent',
        })
        const onClose = vi.fn()
        const onSuccess = vi.fn()
        const { result } = renderHook(() =>
            useEmployeeFailedTaskModal({ taskId: '1', onClose, onSuccess })
        )
        act(() => {
            result.current.setReason(
                `This task has multiple blockers
                Backend services are failing and dependencies are not responding properly`
            )
        })
        await act(async () => {
            await result.current.handleReject()
        })
        expect(requestRejection).toHaveBeenCalled()
        expect(toast.success).toHaveBeenCalled()
        expect(onSuccess).toHaveBeenCalled()
        expect(onClose).toHaveBeenCalled()
    })

    it('should handle API error', async () => {
        requestRejection.mockRejectedValue({
            response: { data: { message: 'Error' } },
        })
        const { result } = renderHook(() =>
            useEmployeeFailedTaskModal({ taskId: '1' })
        )
        act(() => {
            result.current.setReason(
                `This task has multiple blockers
                Backend services are failing and dependencies are not responding properly`
            )
        })
        await act(async () => {
            await result.current.handleReject()
        })
        expect(toast.error).toHaveBeenCalledWith('Error')
    })
})