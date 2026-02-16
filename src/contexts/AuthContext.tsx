'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { loginApi, logoutApi, getCurrentUserApi, refreshTokenApi } from '@/lib/api/auth';
import { setAccessToken } from '@/lib/api/client';
import { ApiError } from '@/lib/api/client';
import type { AdminUserResponse } from '@/types/api';

// ============================================
// Auth Context Types
// ============================================

interface AuthState {
    user: AdminUserResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// Auth Provider
// ============================================

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true, // true while checking existing session
    });

    /**
     * Try to restore session on mount using the refresh token cookie
     */
    const initializeAuth = useCallback(async () => {
        try {
            // Try refreshing the token (uses HttpOnly cookie)
            const refreshResponse = await refreshTokenApi();
            setAccessToken(refreshResponse.data.accessToken);

            // Fetch user info with the new token
            const userResponse = await getCurrentUserApi();
            setState({
                user: userResponse.data,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch {
            // No valid session — clear state
            setAccessToken(null);
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    }, []);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    /**
     * Login with email and password
     */
    const login = useCallback(
        async (email: string, password: string) => {
            const response = await loginApi(email, password);
            const { accessToken, user } = response.data;

            setAccessToken(accessToken);
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
            });

            router.push('/dashboard');
        },
        [router]
    );

    /**
     * Logout — revoke tokens and redirect
     */
    const logout = useCallback(async () => {
        try {
            await logoutApi();
        } catch (error) {
            // Log but don't block logout UX
            if (error instanceof ApiError) {
                console.warn('Logout API call failed:', error.message);
            }
        } finally {
            setAccessToken(null);
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
            router.push('/login');
        }
    }, [router]);

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ============================================
// Hook
// ============================================

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
