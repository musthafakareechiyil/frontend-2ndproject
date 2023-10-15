import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faHouse, faMagnifyingGlass, faPhotoFilm, faComment, faBell } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../Redux/adiminSlice';
import { userLogout } from '../Redux/userSlice';
import { resetFeed } from '../Redux/feedSlice';


function Sidebar( {type, styleprop} ) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state?.userDetails?.user)

    const handleLogout = () => {
      if (type === "admin") {
        dispatch(adminLogout());
      }else{
        dispatch(userLogout())
        dispatch(resetFeed())
      } 
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
          
            {/* Home button */}
            <li className="mb-4">
              <Link to="/" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "home" ? "font-bold" : '' }`}>
                <lord-icon
                  src="https://cdn.lordicon.com/cnpvyndp.json"
                  trigger="hover"
                  colors="primary:#ffffff"      
                />
                <div className='hidden md:flex ml-4 mt-2'>Home</div>
              </Link>
            </li>

            {/* search button */}
            <li className="mb-4">
              <Link to="/users" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "search" ? "font-bold" : '' }`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='mr-4' /> 
                <div className='hidden md:flex'>Search</div>
              </Link>
            </li>

            {/* Explore button */}
            <li className="mb-4">
              <Link to="/users" className="flex items-center text-white hover:bg-gray-700 px-4 py-2 ml-4 rounded-md ">
                <FontAwesomeIcon icon={faPhotoFilm} className='mr-3' /> 
                <div className='hidden md:flex'>Explore</div>
              </Link>
            </li>

            {/* messages */}
            <li className="mb-4">
              <Link to="/users" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "messages" ? "font-bold" : '' }`}>
                <FontAwesomeIcon icon={faComment} className='mr-4' /> 
                <div className='hidden md:flex'>Messages</div>
              </Link>
            </li>
            
            {/* notification */}
            <li className="mb-4">
              <Link to="/users" className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "notification" ? "font-bold" : '' }`}>
                <FontAwesomeIcon icon={faBell} className='mr-4' /> 
                <div className='hidden md:flex'>Notification</div>
              </Link>
            </li>

            {/* profile */}
            <li className="mb-4">
              <Link to={`/${currentUser.username}`} className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "profile" ? "font-bold" : '' }`}>
                <img
                  className='w-5 h-5 rounded-full object-cover mr-2'
                  src={currentUser.profile_url}
                  alt={currentUser.id}
                />
                <div className='hidden md:flex'>
                  Profile
                </div>
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
