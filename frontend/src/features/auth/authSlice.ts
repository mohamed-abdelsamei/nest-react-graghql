import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '../../app/store';
import { AuthError, AuthState, User } from './types';
import { gql } from '@apollo/client';
import { client } from '../../app/graphql';

const LOGIN_MUTATION = gql`
  mutation login(
        $email:String!
        $password:String!

    ){login(loginInput:{email:$email,password:$password}){
      token
      user{
          id
          name
          email
      }
    }
  }
`;


const initialState: AuthState = {
    isAuth: localStorage.getItem('token') ? true : false,
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
        setAuthSuccess: (state, { payload }: PayloadAction<User>) => {
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
export function login(email: string, password: string): AppThunk {
    return async (dispatch: AppDispatch) => {

        dispatch(setLoading(true))
        try {
            let { data } = await client.mutate({
                mutation: LOGIN_MUTATION, variables: { email, password }
            })
            localStorage.setItem('token', data.login.token)
            dispatch(setAuthSuccess(data.login.user))
        } catch (error) {
            dispatch(setAuthFailed(error))
        }
    }
}

export function logout(): AppThunk {
    return async (dispatch: AppDispatch) => {
        localStorage.removeItem('token')
        dispatch(setLogOut())
        window.location.href = '/'
    }
}

export default authSlice.reducer;