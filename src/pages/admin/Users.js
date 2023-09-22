import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AdminUrl } from '../../APIs/BaseUrl';
import { useSelector } from 'react-redux';
import '../../../src/scrollbar.css'

function Users() {
    const [users, setUsers] = useState([])
    const adminToken = useSelector((state) => state?.adminDetails?.token)
    console.log(adminToken)

    useEffect(()=>{
        axios.get(AdminUrl+'usermanagment',{
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        })
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                console.log("Error while fetching users", error)
            })
    },[])

  return (
    <div className='bg-gray-800 text-white flex'>
      <Sidebar />
      <div className='w-4/5 h-screen flex justify-center'>
        <div className='p-5 w-1/2 mt-7 overflow-y-auto'>
            <table className='w-full table-auto'>
            <tbody>
                <tr>
                <td className='px-4 py-2 font-bold'>ID</td>
                <td className='px-4 py-2 font-bold'>Username</td>
                <td className='px-4 py-2 font-bold'>Actions</td>
                </tr>
            </tbody>
            <tbody className=''>
                {users.map((user) => (
                <tr key={user.id}>
                    <td className='px-4 py-2'>{user.id}</td>
                    <td className='px-4 py-2'>{user.username}</td>
                    <td className='px-4 py-2'>
                        <FontAwesomeIcon icon={faEye} style={{color: "#ffffff",}} className='mr-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1'/>
                        <FontAwesomeIcon icon={faUserPen} style={{color: "#ffffff",}} className='mr-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1'/>                    
                        <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} className='mr-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1'/>                    
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
