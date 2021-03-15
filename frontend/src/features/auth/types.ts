export interface CurrentUser {
    id: string;
    name: string;
    email: string;
}

export interface AuthError {
    message: string
}

export interface AuthState {
    isAuth: boolean
    currentUser?: CurrentUser|undefined;
    isLoading: boolean
    error: AuthError

}

export interface LoginPayload {
    email: string;
    password: string;
}