import React, { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import logo from '../assets/logo.png'
import { Divider } from "@mui/material";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../../config"; 
import { toast } from 'react-toastify';
import { AuthContext } from "../contexts/AuthContext";

export const LoginPage = () => {  

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);
 
    const handleLogin = (e)=>{
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                try{
                    const user = userCredential.user;
                console.log('user:', user);
                dispatch({type: 'LOGIN', payload: user});
                navigate('/hotels');
                }catch(e){
                    console.log(e);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage); 
            });

    }

    return ( 
        <div className='w-full h-screen flex flex-col md:flex-row justify-center items-center'>
            <div className='w-full h-[550px] md:w-1/2 hidden md:block'>
                <img className='w-full h-full object-contain' src={logo} alt="/" />
            </div>
            <div className='p-16 flex flex-col justify-around'>
                <form onSubmit={handleLogin}>
                    <p className='text-2xl font-semibold text-center mb-4'>Welcome Admin</p>
                    <p className='text-2xl font-semibold text-center mb-4'>Login</p>
                    <p className='text-center mb-8'>Sign into your account</p>
                    <div>
                        
                        <input className='border w-full p-2  rounded-lg mb-4' type="email" placeholder='Email Address' onChange={e=>setEmail(e.target.value)}/>
                        
                        {/* <button className='ml-2 focus:outline-none' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button> */}
                    </div>
                    <input className='border w-full p-2 rounded-lg mb-6' type={showPassword ? 'text' : 'password'} placeholder='Password' onChange={e=>setPassword(e.target.value)} />
                    <button className='w-1/2 py-2 my-4 bg-custom-orange rounded-lg font-bold text-white hover:bg-orange-500' type="submit">Login</button>
                    {/* <p className='text-center'>Forgot Username or Password?</p> */}
                </form>
                {/* <p className='text-center'>Sign Up</p> */}
            </div> 
        </div>
    );
};
