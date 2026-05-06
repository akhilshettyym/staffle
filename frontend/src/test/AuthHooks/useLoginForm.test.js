import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useLoginForm from '../../hooks/AuthHooks/useLoginForm';

vi.mock('../../api/auth', () => ({
  login: vi.fn(),
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

vi.mock('../../slices/authSlice', () => ({
  setCredentials: vi.fn((payload) => ({ type: 'auth/setCredentials', payload })),
}))

vi.mock('../../slices/organizationSlice', () => ({
  fetchOrganization: vi.fn(() => ({ type: 'org/fetchOrganization' })),
}))

import { login } from '../../api/auth'
import toast from 'react-hot-toast'
import { setCredentials } from '../../slices/authSlice'
import { fetchOrganization } from '../../slices/organizationSlice'

describe('useLoginForm', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { })
    })
    afterEach(() => {
        console.error.mockRestore()
    })

  const createMockEvent = () => ({
    preventDefault: vi.fn(),
  })

  it('should login ADMIN and navigate correctly', async () => {
    login.mockResolvedValue({
      token: 'token123',
      user: { role: 'ADMIN' },
    })

    const { result } = renderHook(() => useLoginForm())

    act(() => {
      result.current.setEmail('admin@test.com')
      result.current.setPassword('password123')
    })

    await act(async () => {
      await result.current.handleLogin(createMockEvent())
    })

    expect(login).toHaveBeenCalledWith({
      email: 'admin@test.com',
      password: 'password123',
    })

    expect(setCredentials).toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'auth/setCredentials' })
    )

    expect(fetchOrganization).toHaveBeenCalled()
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'org/fetchOrganization' })
    )

    expect(mockNavigate).toHaveBeenCalledWith('/admin/admin-dashboard')
    expect(toast.success).toHaveBeenCalledWith('Login successful')
  })

  it('should login EMPLOYEE and navigate correctly', async () => {
    login.mockResolvedValue({
      token: 'token123',
      user: { role: 'EMPLOYEE' },
    })

    const { result } = renderHook(() => useLoginForm())

    act(() => {
      result.current.setEmail('emp@test.com')
      result.current.setPassword('password123')
    })

    await act(async () => {
      await result.current.handleLogin(createMockEvent())
    })

    expect(fetchOrganization).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/employee/employee-dashboard')
  })

  it('should login SUPERADMIN and NOT fetch organization', async () => {
    login.mockResolvedValue({
      token: 'token123',
      user: { role: 'SUPERADMIN' },
    })

    const { result } = renderHook(() => useLoginForm())

    act(() => {
      result.current.setEmail('super@test.com')
      result.current.setPassword('password123')
    })

    await act(async () => {
      await result.current.handleLogin(createMockEvent())
    })

    expect(fetchOrganization).not.toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/superadmin/superadmin-dashboard')
  })

  it('should handle login failure', async () => {
    login.mockRejectedValue({
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    })

    const { result } = renderHook(() => useLoginForm())

    act(() => {
      result.current.setEmail('wrong@test.com')
      result.current.setPassword('wrongpass')
    })

    await act(async () => {
      await result.current.handleLogin(createMockEvent())
    })

    expect(toast.error).toHaveBeenCalledWith('Invalid credentials')
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})