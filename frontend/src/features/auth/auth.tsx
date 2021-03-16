import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { RootState } from '../../app/rootReducer';
import { login } from './authSlice';
import { LoginPayload } from './types';


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});
export function Auth() {
    const error = useSelector(
        (state: RootState) => state.auth.error
    );
    const isAuth = useSelector(
        (state: RootState) => state.auth.isAuth
    );
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,

        onSubmit: (values: LoginPayload) => {

            dispatch(login(values.email, values.password))
        },
    });

    if (isAuth) {
        return <Redirect to={'/'} />;
    }
    return (
        <div>
            <h1>Login</h1>
            {error.message ? <p className="error">{error.message}</p> : null}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}

                <button type="submit">Submit</button>
            </form>
            <Link to="/register">new user?</Link>
        </div>
    );
}