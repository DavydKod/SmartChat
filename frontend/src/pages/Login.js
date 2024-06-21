import React from 'react';
import LoginForm from "../components/auth/LoginForm"; // Import the logo image

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-8">

            <div className="mt-8 w-full sm:max-w-md sm:mx-auto">

                <LoginForm/>
            </div>
            <div className="mt-auto"></div>

        </div>
    );
}

export default Login;