import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios.post('http://localhost:4000/api/auth/signup', data) // Change '/api/signup' to your API endpoint
            .then(response => {
                console.log('Signup successful:', response.data);
                // Redirect to home page or perform any other action after successful signup
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Signup failed:', error);
                // Handle signup failure
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" {...register('name', { required: true })} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                    {errors.name && <span className="text-sm text-red-500">Name is required</span>}
                </div>
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
                <button type="submit" className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Sign Up</button>
            </form>
            <div className="mt-4 text-sm">
                <span>Already have an account? <a href="/" className="text-indigo-600 hover:text-indigo-700">Login</a></span>
            </div>
        </div>
    );
};

export default SignupForm;
