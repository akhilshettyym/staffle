import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ProtectedRoute from '../routes/ProtectedRoutes';
import { logout as logoutRedux } from '../slices/authSlice';
import { clearOrganization } from '../slices/organizationSlice';
import toast from 'react-hot-toast';

vi.mock('react-hot-toast', () => ({
    default: {
        error: vi.fn(),
    },
}));

describe('ProtectedRoute', () => {
    const mockLogout = vi.fn();
    const mockClearOrganization = vi.fn();

    const createTestStore = (authState = {}) =>
        configureStore({
            reducer: {
                auth: (state = authState) => state,
                organization: (state = {}) => state,
            },
            preloadedState: {
                auth: authState,
            },
        });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderWithProviders = (ui, authState = {}, initialRoute = '/') => {
        const store = createTestStore(authState);

        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[initialRoute]}>
                    {ui}
                </MemoryRouter>
            </Provider>
        );
    };

    it('should redirect to /login when user is not authenticated', () => {
        renderWithProviders(
            <ProtectedRoute allowedRoles={['ADMIN', 'USER']}>
                <div> Protected Content </div>
            </ProtectedRoute>,
            { token: null, role: null }
        );

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should allow access to SUPER_ADMIN regardless of allowedRoles', () => {
        renderWithProviders(
            <ProtectedRoute allowedRoles={['ADMIN']}>
                <div data-testid="protected-content"> Protected Content </div>
            </ProtectedRoute>,
            { token: 'valid-token', role: 'SUPER_ADMIN' }
        );

        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
        expect(toast.error).not.toHaveBeenCalled();
    });

    it('should allow access when role is in allowedRoles', () => {
        renderWithProviders(
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}>
                <div data-testid="protected-content"> Protected Content </div>
            </ProtectedRoute>,
            { token: 'valid-token', role: 'MANAGER' }
        );

        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    });

    it('should redirect to / and show unauthorized toast when role is not allowed', async () => {
        renderWithProviders(
            <ProtectedRoute allowedRoles={['ADMIN']}>
                <div> Protected Content </div>
            </ProtectedRoute>,
            { token: 'valid-token', role: 'USER' }
        );

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("You are not authorized to access this page");
        });

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should show login toast when no token', async () => {
        renderWithProviders(
            <ProtectedRoute allowedRoles={['ADMIN']}>
                <div>Protected Content</div>
            </ProtectedRoute>,
            { token: null, role: null }
        );

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Please login to continue");
        });
    });

    it('should dispatch logout and clear organization on unauthorized access', async () => {
        const store = createTestStore({ token: 'valid-token', role: 'USER' });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <div> Protected Content </div>
                    </ProtectedRoute>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("You are not authorized to access this page");
        });
    });
});