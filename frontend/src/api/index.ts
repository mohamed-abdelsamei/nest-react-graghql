import { SignUpPayload } from './../features/signUp/types';
import axios from 'axios'
import { ResetPasswordPayload } from '../features/resetPassword/types'
const url = "http://localhost:3000/api/"

export const login = (email: string, password: string) => {
    return axios.post(`${url}auth/login`, { email, password })
}
export const fetchItems = () => {
    return axios.get(`${url}items`)
}

export const addItem = (title: string) => {
    return axios.post(`${url}items`, { title })
}



export const resetPassword = ({ newPassword, oldPassword, newPasswordConfirmation }: ResetPasswordPayload) => {
    return axios.post(`${url}user/reset-password`, { newPassword, oldPassword, newPasswordConfirmation })
}

export const register = ({ name,email,password }: SignUpPayload) => {
    return axios.post(`${url}user/register`, { name, email, password  })
}


