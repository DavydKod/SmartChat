
import React from 'react';
import logo from '../images/logo.png';
import RegisterForm from "../components/auth/RegisterForm"; // Import the logo image

const Signup = () => {
    return (
        <div
            className="
                flex
                min-h-full // Use to make sure the container takes the full height of the screen
                flex-col // Center items vertically
                justify-center // Center items horizontally
                py-12
                sm:px-6
                lg:px-8
            "
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    alt="Logo"
                    height="48"
                    width="48"
                    src={logo}
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }} // Set marginLeft and marginRight to auto for centering horizontally
                />
                <h2
                    className="
                        mt-6
                        text-center
                        text-3xl
                        font-bold
                        tracjing-tight
                        text-gray-900
                    "
                >
                    Sign in to your account
                </h2>
            </div>
            <RegisterForm></RegisterForm>
        </div>
    );
}

export default Signup;