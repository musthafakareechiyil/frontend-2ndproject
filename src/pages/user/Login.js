import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserUrl } from '../../APIs/BaseUrl';
import { currentUser } from '../../Redux/userSlice';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../config/firebase_sdk';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Login() {
  const [epu, setEpu] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpForm, setOtpForm] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState()
  const [otp, setOtp] = useState()
  const [user, setUser] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userData = {};
      const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const numericRegExp = /^\d+$/;

      if (epu.match(emailRegExp)) {
        userData = {
          email: epu,
          password: password,
        };
      } else if (numericRegExp.test(epu) && epu.length >= 10) {
        userData = {
          phone: epu,
          password: password,
        };
      } else {
        userData = {
          username: epu,
          password: password,
        };
      }

      const response = await axios.post(UserUrl + 'login', userData);
      if (response.status === 200) {
        console.log('Logged in successfully', response.data);

        const user = response.data.user;
        const token = response.data.token;
        dispatch(currentUser({ user: user, token }));

        navigate('/');
      } else {
        console.log('Login failed', response.statusText);
      }
    } catch (error) {
      console.log('Error occurred', error);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    console.log('Google login successful', googleToken);

    axios
      .post(UserUrl + 'login', { google_token: googleToken })
      .then((response) => {
        if (response.status === 200) {
          console.log('Logged in successfully with Google', response.data);

          const user = response.data.user;
          const token = response.data.token;
          dispatch(currentUser({ user: user, token }));

          navigate('/');
        } else {
          console.log('Login with Google failed', response.statusText);
        }
      })
      .catch((error) => {
        console.log('Error occurred while logging in with Google', error);
      });
  };
  const handleSendOtp = async() => {
    try{
      const recaptchaVerifier = new RecaptchaVerifier(auth,"recaptcha",{})
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      setUser(confirmation)
      console.log(confirmation)
      
    }catch(error){
      console.log("error occured while sending", error)
    }
  }

  const handleVerifyOtp = async() => {
    try{
      if (user && user.confirm){
        const confirmation = await user.confirm(otp)
        console.log(confirmation)

        const phoneToken = confirmation.user.accessToken

        console.log("user details ,", phoneToken)

        const response = await axios.post(UserUrl+'login',{phone_token: phoneToken})

        console.log(response)


      }
    }catch(error){

    }
  }

  const isEpuNotEmpty = epu.trim() !== '';
  const isPasswordNotEmpty = password.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md bg-gray-900 rounded-md shadow-2xl">
        <h2 className="text-center text-white text-2xl font-semibold">App Logo</h2>
        { !otpForm &&(
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
                onChange={(e) => {
                  setEpu(e.target.value);
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
                onChange={(e) => {
                  setPassword(e.target.value);
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
          <div className='border-t-2 shadow-sm border-gray-700 pt-3'></div>
          <div className='flex pb-3 space-x-10'>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <div className='bg-indigo-600 hover:bg-indigo-800 text-white cursor-pointer rounded-md px-2 py-2 h-10 flex items-center space-x-2'
               onClick={()=> setOtpForm(true)}
          >
          <span>Otp</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          </div>
          </div>
          <p className='text-white text-sm mt-5'>donot have an account?  <Link to="/signup" className='text-indigo-500'> Sign up</Link></p>
        </form>
        )}
        {otpForm && (
          <div>
            {/* Render the OTP form here */}
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                Phone Number
              </label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 my-5 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleSendOtp}
                className="group relative w-full flex justify-center py-2 px-4 mb-7 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send OTP
              </button>
            </div>
            <div id = "recaptcha" className='mb-5'>

            </div>
              <div className="flex justify-between items-center">
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-s-md relative block w-full px-3 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Enter OTP"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="group relative flex-shrink-0 py-2 px-4 border border-transparent text-sm font-medium rounded-e-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 h-9"
              >
                Verify OTP
              </button>
            </div>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "#ffffff",}} className='mt-5 ml-1 cursor-pointer' onClick={()=>setOtpForm(false)}/>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Login;
