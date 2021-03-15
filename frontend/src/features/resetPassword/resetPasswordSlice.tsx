import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';
import * as api from '../../api'
import { ResetPasswordState, ResetError, ResetPasswordPayload } from './types';


const initialState: ResetPasswordState = {
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
        setResetFailed: (state, { payload }: PayloadAction<ResetError>) => {
            state.error = payload
        },
    }
});


export const { setResetFailed, setLoading } = authSlice.actions
// Asynchronous thunk action
export function resetPassword(payload: ResetPasswordPayload) {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true))
        try {
            const response = await api.resetPassword(payload)
            const data = await response.data
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setResetFailed(error))
            dispatch(setLoading(false))
            
        }
    }
}

export default authSlice.reducer;