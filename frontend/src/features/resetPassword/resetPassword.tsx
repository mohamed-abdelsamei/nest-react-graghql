import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { resetPassword } from './resetPasswordSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ResetPasswordPayload } from './types';

const ResetPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    newPassword: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    newPasswordConfirmation: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

export function ResetPassword() {
    const error = useSelector(
        (state: RootState) => state.auth.error
    );
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
        },
        validationSchema: ResetPasswordSchema,

        onSubmit: (values: ResetPasswordPayload) => {
            dispatch(resetPassword(values))
        },
    });


    return (
        <div>
            <h1>Login</h1>
            {error.message ? <p className="error">{error.message}</p> : null}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="oldPassword">Password</label>
                <input
                    id="oldPassword"
                    name="oldPassword"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.oldPassword}
                />
                {formik.errors.oldPassword ? <div className="error">{formik.errors.oldPassword}</div> : null}


                <label htmlFor="newPassword">Password</label>
                <input
                    id="newPassword"
                    name="newPassword"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                />
                {formik.errors.newPassword ? <div className="error">{formik.errors.newPassword}</div> : null}


                <label htmlFor="newPasswordConfirmation">Password</label>
                <input
                    id="newPasswordConfirmation"
                    name="newPasswordConfirmation"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.newPasswordConfirmation}
                />
                {formik.errors.newPasswordConfirmation ? <div className="error">{formik.errors.newPasswordConfirmation}</div> : null}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}