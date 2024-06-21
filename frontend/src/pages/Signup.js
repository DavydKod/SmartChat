import React from 'react';
import RegisterForm from "../components/auth/RegisterForm";

const Signup = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-8">

            <div className="mt-8 w-full sm:max-w-md sm:mx-auto">
                <RegisterForm/>
            </div>
            <div className="mt-auto"></div>

        </div>
    );
}

export default Signup;