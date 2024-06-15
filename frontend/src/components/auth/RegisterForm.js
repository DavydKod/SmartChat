import React from 'react';
import { useForm } from 'react-hook-form';
import logo from "../../images/logo2.jpg";
import {useNavigate} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {SignUp} from "../../redux/actions/userActions";

const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { status, error } = useSelector((state) => state.user);

    const onSubmit = async (values) => {
        let res = await dispatch(SignUp({ ...values }));
        console.log(res);
        if (res?.payload?.user) {
            navigate("/chat");
        }
    };

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
                    }} // Set marginLeft and marginRight to auto for centering horizontally
                />
            </div>

            <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" {...register('name', { required: true })}
                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                    {errors.name && <span className="text-sm text-red-500">Name is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag</label>
                    <input type="text" id="tag" {...register('tag', { required: true })}
                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                    {errors.tag && <span className="text-sm text-red-500">Tag is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" {...register('email', { required: true })}
                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                    {errors.email && <span className="text-sm text-red-500">Email is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" {...register('password', { required: true })}
                           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>
                    {errors.password && <span className="text-sm text-red-500">Password is required</span>}
                </div>
                <button type="submit"
                        className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
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
