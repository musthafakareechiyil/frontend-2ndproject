import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faHouse, faMagnifyingGlass, faPhotoFilm, faComment, faBell, faUser, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../Redux/adiminSlice';
import { userLogout } from '../Redux/userSlice';


function Sidebar( {type, styleprop} ) {
    const dispatch = useDispatch()

    const handleLogout = () => {
      type === "admin" ? 
        dispatch(adminLogout()) : dispatch(userLogout())
    }

    const appLogo = {logo: "https://res.cloudinary.com/dbpcfcpit/image/upload/v1696220925/V-logo-removebg-preview_rjpizi.png"}

  return (
    <div className="bg-gray-900 h-screen w-1/6 flex flex-col justify-between shadow-2xl">
    
      <div className="p-7">
        <img
          src={appLogo.logo}
          alt="app logo"
          className="w-16 h-16 mx-auto mt-7"
        />
      </div>

      <nav className="flex-1">
{/* Admin Sidebar */}      
      { type === "admin" && (
        <ul>
            <li className="mb-4">
              <Link to="/dashboard" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "dashboard" ? "font-bold" : '' }`}>
                  <FontAwesomeIcon icon={faChartLine} style={{color: "#ffffff",}} className='mr-4'/>
                  <div className='hidden md:flex'>Dashboard</div>
              </Link>
            </li>

            <li className="mb-4">
              <Link to="/users" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "users" ? "font-bold" : '' }`}>
                  <FontAwesomeIcon icon={faUsers} className='mr-4' /> 
                  <div className='hidden md:flex'>Users</div>
              </Link>
            </li>
        </ul>
      )}
{/*User Sidebar*/}
      { type === "user" && (
        <ul>
            <li className="mb-4">
              <Link to="/" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "home" ? "font-bold" : '' }`}>
                  <FontAwesomeIcon icon={faHouse} className='mr-4'/>
                  <div className='hidden md:flex'>Home</div>
              </Link>
            </li>

            <li className="mb-4">
              <Link to="/users" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "search" ? "font-bold" : '' }`}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-4' /> 
                  <div className='hidden md:flex'>Search</div>
              </Link>
            </li>
            <li className="mb-4">
            <Link to="/users" className="flex items-center text-white hover:bg-gray-700 px-4 py-2 ml-4 rounded-md ">
                <FontAwesomeIcon icon={faPhotoFilm} className='mr-3' /> 
                <div className='hidden md:flex'>Explore</div>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/users" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "messages" ? "font-bold" : '' }`}>
                <FontAwesomeIcon icon={faComment} className='mr-4' /> 
                <div className='hidden md:flex'>Messages</div>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/users" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "notification" ? "font-bold" : '' }`}>
                <FontAwesomeIcon icon={faBell} className='mr-4' /> 
                <div className='hidden md:flex'>Notification</div>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/user/profile" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "profile" ? "font-bold" : '' }`}>
                <FontAwesomeIcon icon={faUser} className='mr-4' /> 
                <div className='hidden md:flex'>profile</div>
            </Link>
          </li>
        </ul>
        )}
      </nav>
{/*Logout Button*/}
      <div className="p-4">
        <button
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full w-full">
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;
