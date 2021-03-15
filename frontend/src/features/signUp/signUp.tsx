import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SignUpPayload } from './types';
import { signUp } from './signUpSlice';


const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});
export function SignUp() {
    const error = useSelector(
        (state: RootState) => state.auth.error
    );
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: SignupSchema,

        onSubmit: (values: SignUpPayload) => {

            dispatch(signUp(values))
        },
    });


    return (
        <div>
            <h1>Register</h1>
            {error.message ? <p className="error">{error.message}</p> : null}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="string"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}

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
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}