import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../Redux/adiminSlice';

function Sidebar() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(adminLogout())
    }

  return (
    <div className="bg-gray-900 h-screen w-1/5 flex flex-col justify-between">
    
      <div className="p-7">
        <img
          src="/home/musthafa/Desktop/2nd project/frontend/src/Logo.png"
          alt="App Logo"
          className="w-16 h-16 mx-auto mt-7"
        />
      </div>

      <nav className="flex-1">
        <ul>

          <li className="mb-2">
            <Link to="/dashboard" className="flex items-center justify-center text-white p-5 font-bold  ">
                <FontAwesomeIcon icon={faChartLine} style={{color: "#ffffff",}} className='mr-4'/>
                Dashboard
            </Link>
          </li>

          <li className="mb-2">
            <Link to="/users" className="flex items-center justify-center text-white hover:bg-gray-700 p-2  ">
                <FontAwesomeIcon icon={faUsers} className='mr-4' /> 
                Users
            </Link>
          </li>

        </ul>
      </nav>

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
