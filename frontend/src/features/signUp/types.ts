export interface User {
    id?: string;
    name?: string;
    email?: string;
}

export interface SignUpError {
    message: string
}
export interface SignUpSuccess {

    message: string
}

export interface SignUpState {
    isLoading: boolean
    error: SignUpError
    success: SignUpSuccess
}

export interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}