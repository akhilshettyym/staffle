import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useCreateOrganizationForm from '../../hooks/AuthHooks/useCreateOrganizationForm';

vi.mock('../../api/auth', () => ({
    createOrganization: vi.fn(),
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

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}))

import { createOrganization } from '../../api/auth'
import toast from 'react-hot-toast'

describe('useCreateOrganizationForm', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { })
    })
    afterEach(() => {
        console.error.mockRestore()
    })

    const createMockEvent = () => {
        const form = document.createElement('form')

        form.innerHTML = `
     <input name="firstName" value="John" />
     <input name="lastName" value="Doe" />
     <input name="email" value="john@test.com" />
     <input name="password" value="password123" />
     <input name="confirmPassword" value="password123" />
     <input name="dateOfBirth" value="2000-01-01" />
     <input name="orgName" value="Test Org" />
     <input name="orgDescription" value="Test Desc" />
   `

        return {
            preventDefault: vi.fn(),
            target: form,
        }
    }

    it('should create organization successfully', async () => {
        createOrganization.mockResolvedValue({
            success: true,
            token: 'mock-token',
            user: { id: 1 },
            message: 'Created successfully',
        })

        const { result } = renderHook(() => useCreateOrganizationForm())

        const event = createMockEvent()

        await act(async () => {
            await result.current.handleCreateOrganization(event)
        })

        expect(createOrganization).toHaveBeenCalled()
        expect(toast.success).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalled()
        expect(mockNavigate).toHaveBeenCalledWith('/complete-organization')
    })

    it('should show error when passwords do not match', async () => {
        const { result } = renderHook(() => useCreateOrganizationForm())

        const form = document.createElement('form')
        form.innerHTML = `
     <input name="firstName" value="John" />
     <input name="lastName" value="Doe" />
     <input name="email" value="john@test.com" />
     <input name="password" value="password123" />
     <input name="confirmPassword" value="wrongpass" />
     <input name="dateOfBirth" value="2000-01-01" />
     <input name="orgName" value="Test Org" />
     <input name="orgDescription" value="Test Desc" />
   `

        const event = {
            preventDefault: vi.fn(),
            target: form,
        }

        await act(async () => {
            await result.current.handleCreateOrganization(event)
        })

        expect(toast.error).toHaveBeenCalledWith("Passwords do not match")
        expect(createOrganization).not.toHaveBeenCalled()
    })

    it('should handle API failure', async () => {
        createOrganization.mockResolvedValue({
            success: false,
            message: 'Failed to create',
        })

        const { result } = renderHook(() => useCreateOrganizationForm())

        const event = createMockEvent()

        await act(async () => {
            await result.current.handleCreateOrganization(event)
        })

        expect(toast.error).toHaveBeenCalledWith('Failed to create')
    })
})