import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import LoginNavbar from '../components/LoginNavbar'
import axiosInstance from '../utils/axiosInstance'
import PasswordInput from '../components/PasswordInput'
import { validateEmail } from '../utils/helper'
import { validatePassword } from '../utils/helper';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      e.preventDefault();
      if(!validatePassword(password)){
        setError("Please enter the password.");
        return;
      }
    }
    setError("");

    try {
      console.log(1);
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      console.log(2);

      if (response.data && response.data.accessToken) {
        console.log(3);
        localStorage.setItem("token", response.data.accessToken);
        console.log(4);
        navigate("/dsr");
        console.log(5);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred: Please try again");
      }
    }
  };

  return (
    <div className='min-h-screen min-w-screen flex flex-col bg-slate-50'>
      <LoginNavbar />
      <div className='flex-grow flex items-center justify-center select-none'>
        <div className='w-120 border rounded-lg bg-white border-slate-200 px-7 py-10 m-6 mb-20'>
          <form onSubmit={handleLogin} className='select-none'>
            <h4 className='text-2xl mb-7 text-slate-950 select-text'> Login</h4>

            <input
              type='text'
              placeholder='Email'
              className='w-full text-sm text-slate-950 bg-transparent border-[1.5px] px-5 py-3 rounded mb-7 outline-none border-slate-200 placeholder-slate-400 select-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='w-full text-sm bg-blue-500 text-white p-2 rounded my-1 hover:bg-blue-600'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login