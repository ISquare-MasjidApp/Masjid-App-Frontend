// ============================================
// API Response Types — matches backend DTOs
// ============================================

/**
 * Standard API success response wrapper
 * All successful responses follow: { data: T, meta: Meta }
 */
export interface ApiResponse<T> {
    data: T;
    meta: {
        timestamp: string;
        requestId: string;
    };
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
    error: {
        code: string;
        message: string;
        details?: Record<string, string>;
    };
    meta: {
        timestamp: string;
        requestId: string;
    };
}

// ============================================
// Auth Request DTOs
// ============================================

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

// ============================================
// Auth Response DTOs
// ============================================

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    user: AdminUserResponse;
}

export interface RefreshTokenResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
}

export interface AdminUserResponse {
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: 'super_admin' | 'admin';
    lastLoginAt: string | null;
    createdAt: string;
}

export interface MessageResponse {
    message: string;
}
