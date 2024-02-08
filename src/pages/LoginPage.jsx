import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import logo from '../assets/logo.png'
import { Divider } from "@mui/material";

export const LoginPage = () => {  

    const [showPassword, setShowPassword] = useState(false);

    return ( 
        <div className='w-full h-screen flex flex-col md:flex-row justify-center items-center'>
            <div className='w-full h-[550px] md:w-1/2 hidden md:block'>
                <img className='w-full h-full object-contain' src={logo} alt="/" />
            </div>
            <div className='p-16 flex flex-col justify-around'>
                <form>
                    <p className='text-2xl font-semibold text-center mb-4'>Welcome Admin</p>
                    <p className='text-2xl font-semibold text-center mb-4'>Login</p>
                    <p className='text-center mb-8'>Sign into your account</p>
                    <div>
                        
                        <input className='border w-full p-2  rounded-lg mb-4' type="text" placeholder='Email Address' />
                        
                        {/* <button className='ml-2 focus:outline-none' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button> */}
                    </div>
                    <input className='border w-full p-2 rounded-lg mb-6' type={showPassword ? 'text' : 'password'} placeholder='Password' />
                    <button className='w-1/2 py-2 my-4 bg-custom-orange rounded-lg font-bold text-white hover:bg-orange-500'>Login</button>
                    {/* <p className='text-center'>Forgot Username or Password?</p> */}
                </form>
                {/* <p className='text-center'>Sign Up</p> */}
            </div>
        </div>
    );
};
