import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserUrl } from '../../APIs/BaseUrl'

function Signup() {
  const [emailorphone, setEmailorphone] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [alert, setAlert] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let userData = {}
      const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (emailorphone.match(emailRegExp)){
        userData = {
          user:{
            email: emailorphone,
            password: password,
            fullname: fullname,
            username: username
          }
        }
      }else{
        userData = {
          user:{
            phone: emailorphone,
            password: password,
            fullname: fullname,
            username: username
          }
        }
      }

      const response = await axios.post(UserUrl+'users',userData);

      if (response && response.status === 201){
        console.log('Registration success',response.data)
        navigate("/login")
      }else{
        console.log('Registration failed',response?.statusText)
      }
    }catch(error){
      console.log('Error occurred',error)
      if (error?.response?.data?.errors) {
        setAlert(error?.response?.data?.errors);
      } else {
        setAlert(['An error occurred. Please try again.']);
      }    
    }
  }
  const isEmailorphoneNotEmpty = emailorphone.trim() !== '';
  const isPasswordNotEmpty = password.trim() !== '';
  const isFullnameNotEmpty = fullname.trim() !== '';
  const isUsernameNotEmpty = username.trim() !== '';
  const appLogo = {logo: "https://res.cloudinary.com/dbpcfcpit/image/upload/v1696220925/V-logo-removebg-preview_rjpizi.png"}


  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center sm:py-12">
    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md bg-gray-900 rounded-md shadow-2xl">
      <img 
        src={appLogo.logo}
        className="w-28 h-auto mx-auto"
        alt='App Logo'
      />
      <form className="mt-1 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px ">
          <div className='pb-4'>
            {isEmailorphoneNotEmpty && (
              <p className='text-gray-400 text-xs pl-3 pb-1'>Email or Phone</p>
            )}
            <label htmlFor="email" className="sr-only ">
              Email or Phone
            </label>
            <input
              value={emailorphone}
              onChange = {(e) => {
                setEmailorphone(e.target.value)
              }}
              id="emailorPhone"
              name="emailorPhone"
              type="emailorPhone"
              autoComplete="emailorPhone"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2  placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="Email or Phone"
            />
          </div>
          <div className='pb-4'>
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
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="Password"
            />
          </div>
          <div className='pb-4'>
          {isFullnameNotEmpty && (
            <p className='text-gray-400 text-xs pl-3 pb-1'>Fullname</p>
          )}
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <input
              value={fullname}
              onChange = {(e) => {
                setFullname(e.target.value)
              }}
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2  placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="Full Name"
            />
          </div>
          <div>
          {isUsernameNotEmpty && (
            <p className='text-gray-400 text-xs pl-3 pb-1'>Username</p>
          )}
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              value={username}
              onChange = {(e) => {
                setUsername(e.target.value)
              }}
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2  placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
              placeholder="Username"
            />
          </div>
        </div>
        {alert.length > 0 && (
          <div className="text-red-500 text-sm mt-2">
            <ul>
              {alert.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <p className='text-white text-sm mt-5'>already have an account? <Link to="/login" className='text-indigo-500'>Log in</Link></p>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup
