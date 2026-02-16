import { get, post, put, del } from '@/lib/api/client';
import type { ApiResponse } from '@/types/api';
import type {
    PrayerTimeResponse,
    PrayerTimesListResponse,
    CreatePrayerTimeRequest,
    UpdatePrayerTimeRequest,
    BulkPrayerTimeRequest,
    BulkPrayerTimeResult,
} from '@/types/prayer-times';

// ============================================
// Prayer Times API Service
// ============================================

const BASE = '/admin/prayer-times';

/**
 * Get paginated prayer times with optional date range filter
 */
export async function getPrayerTimes(params?: {
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}): Promise<PrayerTimesListResponse> {
    const query = new URLSearchParams();
    if (params?.startDate) query.set('startDate', params.startDate);
    if (params?.endDate) query.set('endDate', params.endDate);
    if (params?.page !== undefined) query.set('page', String(params.page));
    if (params?.size !== undefined) query.set('size', String(params.size));

    const queryStr = query.toString();
    const url = queryStr ? `${BASE}?${queryStr}` : BASE;

    const response = await get<ApiResponse<PrayerTimesListResponse>>(url);
    return response.data;
}

/**
 * Get a single prayer time by ID
 */
export async function getPrayerTimeById(id: string): Promise<PrayerTimeResponse> {
    const response = await get<ApiResponse<PrayerTimeResponse>>(`${BASE}/${id}`);
    return response.data;
}

/**
 * Create a new prayer time entry
 */
export async function createPrayerTime(data: CreatePrayerTimeRequest): Promise<PrayerTimeResponse> {
    const response = await post<ApiResponse<PrayerTimeResponse>>(BASE, data);
    return response.data;
}

/**
 * Bulk create or update prayer times
 */
export async function bulkCreatePrayerTimes(data: BulkPrayerTimeRequest): Promise<BulkPrayerTimeResult> {
    const response = await post<ApiResponse<BulkPrayerTimeResult>>(`${BASE}/bulk`, data);
    return response.data;
}

/**
 * Update an existing prayer time
 */
export async function updatePrayerTime(id: string, data: UpdatePrayerTimeRequest): Promise<PrayerTimeResponse> {
    const response = await put<ApiResponse<PrayerTimeResponse>>(`${BASE}/${id}`, data);
    return response.data;
}

/**
 * Delete a prayer time entry
 */
export async function deletePrayerTime(id: string): Promise<void> {
    await del(`${BASE}/${id}`);
}
