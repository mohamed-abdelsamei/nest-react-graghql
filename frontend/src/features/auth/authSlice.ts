import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';
import { AuthError, AuthState, CurrentUser } from './types';
import * as api from '../../api'

const initialState: AuthState = {
    isAuth: false,
    isLoading: false,
    error: { message: '' },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
        setAuthSuccess: (state, { payload }: PayloadAction<CurrentUser>) => {
            state.currentUser = payload
            state.isAuth = true
        },
        setLogOut: (state) => {
            state.isAuth = false
            state.currentUser = undefined
        },
        setAuthFailed: (state, { payload }: PayloadAction<AuthError>) => {
            state.error = payload
            state.isAuth = false
        },
    }
});


export const { setAuthSuccess, setLogOut, setLoading, setAuthFailed } = authSlice.actions
// Asynchronous thunk action
export function login(email:string,password:string) {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await api.login(email,password)
            const data = await response.data

            dispatch(setAuthSuccess(data))
        } catch (error) {
            dispatch(setAuthFailed(error))
        }
    }
}

export default authSlice.reducer;