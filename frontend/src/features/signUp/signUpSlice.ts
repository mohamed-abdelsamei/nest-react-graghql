import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';
import { CurrentUser, SignUpState, SignUpError, SignUpPayload } from './types';
import * as api from '../../api'
import { gql } from '@apollo/client';
import { client } from '../../app/graphql';
import { setAuthFailed, setAuthSuccess } from '../auth/authSlice';

const SIGNUP_MUTATION = gql`
  mutation signUp(
        $email:String!
        $name:String!
        $password:String!

    ){signUp(signUpInput:{name:$name,email:$email,password:$password}){
      token
      user{
          id
          name
          email
      }
    }
  }
`;

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
export function signUp({ name, email, password}:SignUpPayload) {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoading(true))
        try {
            try {
                let { data } = await client.mutate({
                    mutation: SIGNUP_MUTATION, variables: { email, password, name }
                })
                localStorage.setItem('token', data.signUp.token)
                dispatch(setAuthSuccess(data.signUp.user))
            } catch (error) {
                dispatch(setAuthFailed(error))
            }
        } catch (error) {
            dispatch(setSignUpFailed(error))
        }
    }
}

export default signUpSlice.reducer;