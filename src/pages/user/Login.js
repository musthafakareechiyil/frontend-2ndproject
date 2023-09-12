import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { UserUrl } from '../../APIs/BaseUrl'

function Login() {
    const [epu, setEpu] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let userData = {}
            const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            const numericRegExp = /^\d+$/;

            if (epu.match(emailRegExp)){
                userData = {
                    email: epu,
                    password: password
                }
            }else if (numericRegExp.test(epu) && epu.length >= 10){
                userData = {
                    phone: epu,
                    password: password
                }
            }else{
                userData = {
                    username: epu,
                    password: password
                }
            }

            const response = await axios.post(UserUrl+'login',userData);
            if (response.status === 200){
                console.log("Logged in successfully", response.data);
            }else{
                console.log("Login failed",response.statusText)
            }
        }catch(error){
            console.log("Error occurred",error)
        }
    }

    const isEpuNotEmpty = epu.trim() !== '';
    const isPasswordNotEmpty = password.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md bg-gray-900 rounded-md shadow-2xl">
        <h2 className="text-center text-white text-2xl font-semibold">App Logo</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="pb-4">
              {isEpuNotEmpty && (
                <p className='text-gray-400 text-xs pl-3 pb-1'>Email Phone or Username</p>
              )}
              <label htmlFor="emailOrPhoneOrUsername" className="sr-only">
                Email Phone or Username
              </label>
              <input
                value={epu}
                onChange = {(e) => {
                    setEpu(e.target.value)
                }}
                id="emailOrPhoneOrUsername"
                name="emailOrPhoneOrUsername"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-400 text-white focus:outline-none focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Email Phone or Username"
              />
            </div>
            <div>
              {isPasswordNotEmpty && (
                <p className='text-gray-400 text-xs pl-3 pb-1'>Password</p>
              )}
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={password}
                onChange = {(e) => {
                    setPassword(e.target.value)
                }}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
          <p className='text-white text-sm mt-5'>donot have an account?  <Link to = "/user/users" className='text-indigo-500'> Sign up</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login
