import { db } from '@/db'
import { ApiResponse, ApiSuccessResponse } from '@/features/common/type/api-response'
import { Station } from './api/station'

/**
 * @description Get all stations
 * @returns ApiResponse<Station[]>
 */
export async function getStations(): Promise<ApiResponse<Station[]>> {
    // simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // because of mock data, it's always successful!
    return {
        success: true,
        data: db,
    }
}
