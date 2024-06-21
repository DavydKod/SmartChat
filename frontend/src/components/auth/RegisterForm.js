import React from 'react';
import logo from "../../images/logo2.jpg";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {SignUp} from "../../redux/actions/userActions";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";

const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkUniqueTag = async (tag) => {
        const response = await axios.post('http://localhost:4000/api/user/checkUnique', { tag });
        return response.data.tagExists;
    };

    const checkUniqueEmail = async (email) => {
        const response = await axios.post('http://localhost:4000/api/user/checkUnique', { email });
        return response.data.emailExists;
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(64, 'Name must be 64 characters or less').required('Name is required'),
        tag: Yup.string().max(16, 'Tag must be 16 characters or less').required('Tag is required')
            .test('checkUniqueTag', 'Tag is already in use', async (value) => {
                if (value) {
                    const isUnique = await checkUniqueTag(value);
                    return !isUnique;
                }
                return true;
            }),
        email: Yup.string().email('Invalid email address').max(64, 'Email must be 64 characters or less').required('Email is required')
            .test('checkUniqueEmail', 'Email is already in use', async (value) => {
                if (value) {
                    const isUnique = await checkUniqueEmail(value);
                    return !isUnique;
                }
                return true;
            }),
        password: Yup.string().min(6, 'Password must be at least 6 characters').max(64, 'Password must be 64 characters or less').required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            tag: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            let res = await dispatch(SignUp({ ...values }));
            if (res?.payload?.user) {
                navigate("/chat");
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    alt="Logo"
                    height="60"
                    width="60"
                    src={logo}
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                />
            </div>

            <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...formik.getFieldProps('name')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <span className="text-sm text-red-500">{formik.errors.name}</span>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag</label>
                    <input
                        type="text"
                        id="tag"
                        {...formik.getFieldProps('tag')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {formik.touched.tag && formik.errors.tag ? (
                        <span className="text-sm text-red-500">{formik.errors.tag}</span>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...formik.getFieldProps('email')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <span className="text-sm text-red-500">{formik.errors.email}</span>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps('password')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <span className="text-sm text-red-500">{formik.errors.password}</span>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                >
                    Sign Up
                </button>
            </form>
            <div className="mt-4 text-sm">
                <span>Already have an account? <a href="/" className="text-indigo-600 hover:text-indigo-700">Login</a></span>
            </div>
        </div>
    );
};

export default SignupForm;
