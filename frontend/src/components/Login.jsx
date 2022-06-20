import React from 'react'

import loginImg from '../assets/login.jpg'

export default function Login() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>

        <div className='bg-gray-100 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-white p-4' action='/user/login' method='post'>
                <h2 className='text-4xl font-bold text-center py-6'>Log In</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2' type="email" name='email'/>
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2' type="password" name='password'/>
                </div>
                <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Sign In</button>
                <div className='flex justify-between'>
                <a href='/signup'>Create an account</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export function Signup() {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
          <div className='hidden sm:block'>
              <img className='w-full h-full object-cover' src={loginImg} alt="" />
          </div>
  
          <div className='bg-gray-100 flex flex-col justify-center'>
              <form className='max-w-[400px] w-full mx-auto bg-white p-4' action='/user/signup' method='post'>
                  <h2 className='text-4xl font-bold text-center py-6'>Create Account</h2>
                  <div className='flex flex-col py-2'>
                      <label>Email</label>
                      <input className='border p-2' type="email" name='email'/>
                  </div>
                  <div className='flex flex-col py-2'>
                      <label>Password</label>
                      <input className='border p-2' type="password" name='password'/>
                  </div>
                  <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Sign Up</button>
                  <div className='flex justify-between'>
                  </div>
              </form>
          </div>
      </div>
    )
  }