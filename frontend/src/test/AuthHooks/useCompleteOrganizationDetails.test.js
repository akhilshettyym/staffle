import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useCompleteOrganizationDetails from '../../hooks/AuthHooks/useCompleteOrganizationDetails';

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
    },
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}))

const mockFetchEmployees = vi.fn()
const mockFetchOrganization = vi.fn()

vi.mock('../../utils/useEmployeesDetails', () => ({
    default: () => ({
        employees: [
            {
                id: 1,
                role: 'ADMIN',
                dateOfBirth: '2000-01-01',
            },
            {
                id: 2,
                role: 'EMPLOYEE',
            },
        ],
        fetchEmployees: mockFetchEmployees,
    }),
}))

vi.mock('../../utils/useOrganizationDetails', () => ({
    default: () => ({
        organization: {
            orgCountry: 'IN',
        },
        fetchOrganization: mockFetchOrganization,
    }),
}))

import toast from 'react-hot-toast'

describe('useCompleteOrganizationDetails', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { })
    })
    afterEach(() => {
        console.error.mockRestore()
    })

    it('should derive admin correctly', () => {
        const { result } = renderHook(() => useCompleteOrganizationDetails())

        expect(result.current.admin).toEqual(
            expect.objectContaining({ role: 'ADMIN' })
        )
    })

    it('should format DOB correctly', () => {
        const { result } = renderHook(() => useCompleteOrganizationDetails())

        expect(result.current.formattedDOB).toBeTruthy()
    })

    it('should map orgCountry correctly', () => {
        const { result } = renderHook(() => useCompleteOrganizationDetails())

        expect(result.current.orgCountry).toBe('India')
    })

    it('should call navigate and toast on handleRegisterOrg', () => {
        const { result } = renderHook(() => useCompleteOrganizationDetails())

        act(() => {
            result.current.handleRegisterOrg()
        })

        expect(toast.success).toHaveBeenCalledWith(
            "Organization Registered Successfully..."
        )
        expect(mockNavigate).toHaveBeenCalledWith('/register-organization')
    })

    it('should refresh employees data', async () => {
        mockFetchEmployees.mockResolvedValue({})

        const { result } = renderHook(() => useCompleteOrganizationDetails())

        await act(async () => {
            await result.current.refreshEmployeesData()
        })

        expect(mockFetchEmployees).toHaveBeenCalled()
    })
})