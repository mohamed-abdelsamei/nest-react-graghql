export interface ResetPasswordPayload {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
export interface ResetError {
    message: string
}

export interface ResetPasswordState {
    isLoading: boolean
    error: ResetError
}