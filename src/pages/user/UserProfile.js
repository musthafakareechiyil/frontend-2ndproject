import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import { UserAxios } from '../../config/Header_request'
import { UserUrl } from '../../APIs/BaseUrl'

function UserProfile() {
  const userAxios = UserAxios()
  const [ userData, setUserData ] = useState(null)
  const currentUser = useSelector((state) => state?.userDetails?.user)

  useEffect(() => {
    async function fetchUserData(){
      try{
        const response = await userAxios.get(UserUrl+`users/${currentUser.id}`)
        console.log(response.data)
        setUserData(response?.data)
      }catch(error){
        console.error('Error fetching user data ', error)
      }
    }
    fetchUserData();
  // eslint-disable-next-line
  },[currentUser.id])


  
  return (
    <div className='bg-gray-800 w-screen h-screen text-white flex'>
      {/* Sidebar component */}
      <Sidebar type = "user" styleprop="profile"/>
      <div className='w-4/5 h-screen p-4 flex justify-center'>
        <div className='w-9/12  h-96 flex flex-col justify-center items-center border-b'>
          {/* Profile pic */}
          <div className='w-48 h-48 flex justify-center items-center'>
            <img
            src={currentUser.profile_url}
            alt='Profile'
            className='w-40 h-40 rounded-full object-cover'
            />
          </div>
          {/* Username */}
          <h1 className='text-2xl font-semibold mt-2 mb-3'>{currentUser.username}</h1>
          {/* Edit and View Archive Buttons */}
          <div className='flex mt-4'>
            <button className='text-gray-200 mr-4 px-4 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md'>Edit Profile</button>
            <button className='text-gray-200 mr-4 px-4 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md'>View Archive</button>
          </div>
          {/* posts following followers */}
          <div className='flex mt-6'>
            <div className='mr-6 text-center'>
              <p className='font-semibold'>{userData?.post_count}</p>
              <p className='text-gray-400'>Posts</p>
            </div>
            <div className='mr-6 text-center'>
              <p className='font-semibold'>{userData?.followers_count}</p>
              <p className='text-gray-400'>Followers</p>
            </div>
            <div className='text-center mb-9'>
              <p className='font-semibold'>{userData?.following_count}</p>
              <p className='text-gray-400'>Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
