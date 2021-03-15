import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';
import { CurrentUser, SignUpState, SignUpError, SignUpPayload } from './types';
import * as api from '../../api'

const initialState: SignUpState = {
    isLoading: false,
    error: { message: '' },
    success: { message: '' },
};

const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
        setSignUpSuccess: (state, { payload }: PayloadAction<SignUpError>) => {
            state.success = payload
        },
        setSignUpFailed: (state, { payload }: PayloadAction<SignUpError>) => {
            state.error = payload
        },
    }
});


export const {  setSignUpFailed, setLoading, setSignUpSuccess } = signUpSlice.actions
// Asynchronous thunk action
export function signUp(payload:SignUpPayload) {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await api.register(payload)
            const data = await response.data

            dispatch(setSignUpSuccess(data))
        } catch (error) {
            dispatch(setSignUpFailed(error))
        }
    }
}

export default signUpSlice.reducer;