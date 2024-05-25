import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import {signIn} from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";


const AuthForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (values) => {
        let res = await dispatch(signIn({ ...values }));
        console.log(res);
        if (res?.payload?.user) {
            navigate("/");
        }
    };

    /*const onSubmit = (data) => {
        axios.post('http://localhost:4000/api/auth/login', data) // Change '/api/login' to your API endpoint
            .then(response => {
                console.log('Login successful:', response.data);
                // Add logic to handle successful login
                window.location.href = 'http://localhost:4000/signup';
            })
            .catch(error => {
                console.error('Login failed:', error);
                // Add logic to handle login failure
            });
    };*/

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-3xl font-semibold mb-6">Welcome Back!</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" {...register('email', { required: true })} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                    {errors.email && <span className="text-sm text-red-500">Email is required</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" {...register('password', { required: true })} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                    {errors.password && <span className="text-sm text-red-500">Password is required</span>}
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Login</button>
            </form>
            <div className="mt-4 text-sm">
                <span>Don't have an account? <a href="/signup" className="text-indigo-600 hover:text-indigo-700">Sign Up</a></span>
            </div>
        </div>
    );
};

export default AuthForm;



