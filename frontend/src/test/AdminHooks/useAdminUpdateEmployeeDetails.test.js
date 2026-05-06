import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useAdminUpdateEmployeeDetails from '../../hooks/AdminHooks/useAdminUpdateEmployeeDetails';

vi.mock('../../api/admin', () => ({
    updateEmployee: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
    default: { success: vi.fn(), error: vi.fn() },
}))

import { updateEmployee } from '../../api/admin';
import toast from 'react-hot-toast';

describe('useAdminUpdateEmployeeDetails', () => {

    it('should update employee', async () => {
        updateEmployee.mockResolvedValue({ success: true })

        const refreshEmployees = vi.fn()

        const { result } = renderHook(() =>
            useAdminUpdateEmployeeDetails({
                emp: { _id: '1', firstName: 'A', lastName: 'B', email: 'a@test.com' },
                refreshEmployees
            })
        )

        act(() => {
            result.current.handleChange({ target: { name: 'firstName', value: 'John' } })
            result.current.handleChange({ target: { name: 'lastName', value: 'Doe' } })
            result.current.handleChange({ target: { name: 'email', value: 'john@test.com' } })
            result.current.handleChange({ target: { name: 'designation', value: 'Dev' } })
            result.current.handleDateChange(new Date())
        })

        await act(async () => {
            await result.current.handleUpdateEmployee({ preventDefault: vi.fn() })
        })

        expect(updateEmployee).toHaveBeenCalled()
        expect(toast.success).toHaveBeenCalled()
    })
})