import axios from 'axios';
import React, { useState } from 'react'
import { AdminUrl } from '../../APIs/BaseUrl';
import { loggedAdmin } from '../../Redux/adiminSlice';
import { useDispatch } from 'react-redux'

function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const adminData = {
                email: email,
                password: password
            }

            const response = await axios.post(AdminUrl + 'login', adminData);

            if (response.status === 200) {
                console.log(response.data, "login success")
                const admin = response.data.admin
                const token = response.data.token
                dispatch(loggedAdmin({admin:admin,token}))
            } else {
                console.log("login failed", response.statusText)
            }
        } catch (error) {
            console.log("error occurred", error)
        }
    }

    const isEmailNotEmpty = email.trim() !== '';
    const isPasswordNotEmpty = password.trim() !== '';
    

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md bg-gray-900 rounded-md shadow-2xl">
                <h2 className="text-center text-white text-2xl font-semibold">Admin Login</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="pb-4">
                            {isEmailNotEmpty && (
                                <p className='text-gray-400 text-xs pl-3 pb-1'>Email</p>
                            )}
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-400 text-white focus:outline-none focus:z-10 sm:text-sm bg-gray-700"
                                placeholder="Email"
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
                                onChange={(e) => {
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
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
