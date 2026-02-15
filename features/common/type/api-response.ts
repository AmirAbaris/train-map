export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse

export type ApiSuccessResponse<T> = {
    success: true
    data: T
}

export type ApiFailureResponse = {
    success: false
    error: string
}
