import { post, get, put } from './client';
import type {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenResponse,
    AdminUserResponse,
    MessageResponse,
    ChangePasswordRequest,
} from '@/types/api';

// ============================================
// Auth API Service
// ============================================

/**
 * Login admin user
 */
export function loginApi(email: string, password: string) {
    return post<ApiResponse<LoginResponse>>('/admin/auth/login', {
        email,
        password,
    } satisfies LoginRequest);
}

/**
 * Refresh access token using HttpOnly cookie
 */
export function refreshTokenApi() {
    return post<ApiResponse<RefreshTokenResponse>>('/admin/auth/refresh');
}

/**
 * Logout current user (revokes all refresh tokens)
 */
export function logoutApi() {
    return post<ApiResponse<MessageResponse>>('/admin/auth/logout');
}

/**
 * Get current authenticated user details
 */
export function getCurrentUserApi() {
    return get<ApiResponse<AdminUserResponse>>('/admin/auth/me');
}

/**
 * Change current user's password
 */
export function changePasswordApi(currentPassword: string, newPassword: string) {
    return put<ApiResponse<MessageResponse>>('/admin/auth/change-password', {
        currentPassword,
        newPassword,
    } satisfies ChangePasswordRequest);
}
