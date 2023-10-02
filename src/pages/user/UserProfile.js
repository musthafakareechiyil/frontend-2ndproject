import React from 'react'
import Sidebar from '../../components/Sidebar'

function UserProfile() {

  const userData = {
    dp: "https://imgs.search.brave.com/S4Q092Ic9VDPZIPUc2EqH8Bvx0XVvLNErkxgHy8FpjA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9idWZm/ZXIuY29tL2xpYnJh/cnkvY29udGVudC9p/bWFnZXMvMjAyMi8w/My9hbWluYS5wbmc",
    username: "arora",
    post: 123,
    followers: 5342,
    following: 4323,
    fullname: "Aroroa mangodia",
    bio: "iam a acitve journolist and excommunist",
  }
  return (
    <div className='bg-gray-800 w-screen h-screen text-white flex'>
      {/* Sidebar component */}
      <Sidebar type = "user" styleprop="profile"/>
      <div className='w-4/5 h-screen p-4 flex justify-center'>
        <div className='w-9/12  h-96 flex flex-col justify-center items-center border-b'>
          {/* Profile pic */}
          <div className='w-48 h-48 flex justify-center items-center'>
            <img
            src={userData.dp}
            alt='Profile'
            className='w-40 h-40 rounded-full object-cover'
            />
          </div>
          {/* Username */}
          <h1 className='text-2xl font-semibold mt-4'>{userData.username}</h1>
          {/* Edit and View Archive Buttons */}
          <div className='flex mt-4'>
            <button className='text-gray-200 mr-4 px-4 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md'>Edit Profile</button>
            <button className='text-gray-200 mr-4 px-4 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md'>View Archive</button>
          </div>
          {/* posts following followers */}
          <div className='flex mt-6'>
            <div className='mr-6 text-center'>
              <p className='font-semibold'>{userData.post}</p>
              <p className='text-gray-400'>Posts</p>
            </div>
            <div className='mr-6 text-center'>
              <p className='font-semibold'>{userData.followers}</p>
              <p className='text-gray-400'>Followers</p>
            </div>
            <div className='text-center mb-9'>
              <p className='font-semibold'>{userData.following}</p>
              <p className='text-gray-400'>Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
