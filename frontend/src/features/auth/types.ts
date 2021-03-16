export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthError {
    message: string
}

export interface AuthState {
    isAuth: boolean
    currentUser?: User|undefined;
    isLoading: boolean
    error: AuthError

}

export interface LoginPayload {
    email: string;
    password: string;
}