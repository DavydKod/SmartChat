import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import {signIn} from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo2.jpg";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');

    const onSubmit = async (values) => {
        try {
            let res = await dispatch(signIn({ ...values }));
            if (res?.payload?.user) {
                navigate("/chat");
            } else {
                setLoginError('Invalid email or password');
            }
        } catch (error) {
            setLoginError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center w-full sm:max-w-md">
                <div className="mb-auto"></div>

                <img
                    alt="Logo"
                    height="60"
                    width="60"
                    src={logo}
                    className="mx-auto mb-4"
                />
            </div>
            <h2 className="text-3xl font-semibold mb-6">Welcome Back!</h2>
            {loginError && <div className="text-sm text-red-500 mb-4">{loginError}</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" {...register('email', { required: true })}
                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                    {errors.email && <span className="text-sm text-red-500">Email is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" {...register('password', { required: true })}
                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                    {errors.password && <span className="text-sm text-red-500">Password is required</span>}
                </div>
                <button type="submit"
                        className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Login
                </button>
            </form>
            <div className="mt-4 text-sm">
                <span>Don't have an account? <a href="/signup"
                                                className="text-indigo-600 hover:text-indigo-700">Sign Up</a></span>
            </div>
        </div>
    );
};

export default LoginForm;



