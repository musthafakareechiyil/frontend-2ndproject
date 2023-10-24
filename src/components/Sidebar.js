import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faMagnifyingGlass, faPhotoFilm, faComment, faBell } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../Redux/adiminSlice';
import { userLogout } from '../Redux/userSlice';
import { resetFeed } from '../Redux/feedSlice';
import AddPost from './AddPost';
import Search from './Search';


function Sidebar( {type, styleprop} ) {
    const dispatch = useDispatch()
    const [ addPost, setAddPost ] = useState(false)
    const [ search, setSearch ] = useState(false)
    const currentUser = useSelector((state) => state?.userDetails?.user)

    const closeModal = () => {
      setAddPost(false)
      setSearch(false)
    }

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
              <div className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 cursor-pointer ${ styleprop === "search" ? "font-bold" : '' }`}onClick={()=> setSearch(true)}>
                <lord-icon
                    src="https://cdn.lordicon.com/kkvxgpti.json"
                    trigger="hover"
                    colors="primary:#ffffff"  
                />
                <div className='hidden md:flex ml-3'>Search</div>
              </div>
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

            {/* add post */}
            <li className="mb-4 cursor-pointer"
              onClick={() => setAddPost(true)}
            >
              <div className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "notification" ? "font-bold" : '' }`}>
              <lord-icon
                src="https://cdn.lordicon.com/zrkkrrpl.json"
                trigger="hover"
                stroke="bold"
                state="hover-swirl"
                colors="primary:#ffffff,secondary:#ffffff"
              >
              </lord-icon> 
                <div className='hidden md:flex ml-3'>Add post</div>
              </div>
            </li>

            {/* profile */}
            <li className="mb-4">
              <Link to={`/${currentUser.username}`} className={`flex items-center  text-white px-4 py-2 ml-4 rounded-md hover:bg-gray-700 ${ styleprop === "profile" ? "font-bold" : '' }`}>
                <img
                  className='w-8 h-8 rounded-full object-cover mr-3'
                  src={currentUser.profile_url}
                  alt={currentUser.id}
                />
                <div className='hidden md:flex'>
                  Profile
                </div>
              </Link>
            </li>

            { addPost && (
              <AddPost closeModal={closeModal}/>
            )}

            { search && (
              <Search closeModal={closeModal}/>
            )}

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
