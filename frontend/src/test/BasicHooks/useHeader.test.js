import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useHeader from '../../hooks/BasicHooks/useHeader';

vi.mock('../../api/auth', () => ({
    logoutUser: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

const mockNavigate = vi.fn()
const mockLocation = {
    pathname: '/superadmin/control/org',
}

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
}))

const mockDispatch = vi.fn()

vi.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
    useSelector: (selectorFn) =>
        selectorFn({
            auth: {
                user: {
                    firstName: 'John',
                    lastName: 'Doe',
                    role: 'SUPER_ADMIN',
                },
            },
            organization: {
                data: { id: 1, name: 'Test Org' },
            },
        }),
}))

vi.mock('../../slices/authSlice', () => ({
    logout: vi.fn(() => ({ type: 'auth/logout' })),
}))

vi.mock('../../slices/organizationSlice', () => ({
    clearOrganization: vi.fn(() => ({ type: 'org/clear' })),
}))

import { logoutUser } from '../../api/auth'
import toast from 'react-hot-toast'
import { logout } from '../../slices/authSlice'
import { clearOrganization } from '../../slices/organizationSlice'

describe('useHeader', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { })
    })
    afterEach(() => {
        console.error.mockRestore()
    })

    it('should compute renderName correctly', () => {
        const { result } = renderHook(() => useHeader())

        expect(result.current.renderName).toBe('John Doe')
    })

    it('should return organization data', () => {
        const { result } = renderHook(() => useHeader())

        expect(result.current.organization).toEqual(
            expect.objectContaining({ name: 'Test Org' })
        )
    })

    it('should show exit org for superadmin in control route', () => {
        const { result } = renderHook(() => useHeader())

        expect(result.current.showExitOrg).toBe(true)
    })

    it('should handle logout successfully', async () => {
        logoutUser.mockResolvedValue({})

        const { result } = renderHook(() => useHeader())

        await act(async () => {
            await result.current.handleLogout()
        })

        expect(logoutUser).toHaveBeenCalled()

        expect(logout).toHaveBeenCalled()
        expect(clearOrganization).toHaveBeenCalled()

        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'auth/logout' })
        )

        expect(mockDispatch).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'org/clear' })
        )

        expect(toast.success).toHaveBeenCalledWith(
            "You've been logged out successfully"
        )

        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
    })

    it('should handle logout failure', async () => {
        logoutUser.mockRejectedValue(new Error('fail'))

        const { result } = renderHook(() => useHeader())

        await act(async () => {
            await result.current.handleLogout()
        })

        expect(toast.error).toHaveBeenCalledWith(
            'Something went wrong during logout'
        )
    })

    it('should handle exit org', () => {
        const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

        const { result } = renderHook(() => useHeader())

        act(() => {
            result.current.handleExitOrg()
        })

        expect(removeItemSpy).toHaveBeenCalledWith('orgId')
        expect(mockNavigate).toHaveBeenCalledWith(
            '/superadmin/superadmin-dashboard'
        )
    })
})