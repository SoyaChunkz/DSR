import React from 'react'
import Navbar from '../components/Navbar'
import PasswordInput from '../components/PasswordInput'


const Login = () => {
  return (
    <>
    <div 
    style={{
          backgroundImage: `url('../../src/assets/ClgBg.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }} 
        className=' relative login-bg h-[100vh]'>

      <Navbar />

      <div className='flex items-center justify-center mt-20'>
        <div className=' w-96 bg-white border rounded-2xl px-8 pb-12 pt-10'>
          <form>
            <h4 className=' text-2xl mb-8'>Login</h4>
            <input
              type='text'
              placeholder='Username'
              className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-5 outline-none'
            />

            <PasswordInput />

            <button type='submit' className='w-full text-sm bg-purple-700 text-white p-3 rounded mt-5 mb-2 hover:bg-purple-900 transition-all ease-in-out duration-300'>
              Login
            </button>
          </form>
        </div>

      </div>
      </div>
    </>
  )
}

export default Login