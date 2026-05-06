import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useEmployeeProfileDetails from '../../hooks/EmployeeHooks/useEmployeeProfileDetails';

vi.mock('../../api/admin', () => ({
    updateEmployee: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

const mockSetEmployees = vi.fn()
const mockFetchEmployees = vi.fn()
const mockFetchTasks = vi.fn()

vi.mock('../../utils/useEmployeesDetails', () => ({
    default: () => ({
        employees: [{ _id: '1', firstName: 'John' }],
        setEmployees: mockSetEmployees,
        fetchEmployees: mockFetchEmployees,
    }),
}))

vi.mock('../../utils/useTasksDetails', () => ({
    default: () => ({
        tasks: [{ assignedTo: '1' }],
        fetchTasksDetails: mockFetchTasks,
    }),
}))

vi.mock('react-redux', () => ({
    useSelector: (fn) =>
        fn({
            auth: { user: { _id: '1' } },
        }),
}))

import { updateEmployee } from '../../api/admin';
import toast from 'react-hot-toast';

describe('useEmployeeProfileDetails', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { })
    })
    afterEach(() => {
        console.error.mockRestore()
    })

    it('should update employee successfully', async () => {
        updateEmployee.mockResolvedValue({ success: true })

        const { result } = renderHook(() => useEmployeeProfileDetails())

        act(() => {
            result.current.setFormData({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@test.com',
                dateOfBirth: new Date(),
                designation: 'Dev',
            })
        })

        await act(async () => {
            await result.current.handleUpdateEmployee({ preventDefault: vi.fn() })
        })

        expect(updateEmployee).toHaveBeenCalled()
        expect(toast.success).toHaveBeenCalled()
        expect(mockSetEmployees).toHaveBeenCalled()
    })

    it('should fail validation if missing fields', async () => {
        const { result } = renderHook(() => useEmployeeProfileDetails())

        await act(async () => {
            await result.current.handleUpdateEmployee({ preventDefault: vi.fn() })
        })

        expect(toast.error).toHaveBeenCalled()
        expect(updateEmployee).not.toHaveBeenCalled()
    })

    it('should compute employeeTasks correctly', () => {
        const { result } = renderHook(() => useEmployeeProfileDetails())

        expect(result.current.employeeTasks.length).toBe(1)
    })
})