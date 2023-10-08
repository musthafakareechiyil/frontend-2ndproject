import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import { UserAxios } from '../../config/Header_request';
import { UserUrl } from '../../APIs/BaseUrl';
import axios from 'axios';
import { cloudinary_url } from '../../APIs/Cloudinary_url';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserProfile() {
  const userAxios = UserAxios();
  const [userData, setUserData] = useState(null);
  const currentUser = useSelector((state) => state?.userDetails?.user);
  const [currentDp, setCurrentDp] = useState(currentUser.profile_url);

  const updateLocalStorageProfileUrl = (newProfileUrl) => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if(userData){
      userData.profile_url = newProfileUrl;
      localStorage.setItem('user',JSON.stringify(userData))
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await userAxios.get(`${UserUrl}users/${currentUser.id}`);
        console.log(response.data);
        setUserData(response?.data);
      } catch (error) {
        console.error('Error fetching user data ', error);
      }
    }
    fetchUserData();
    // eslint-disable-next-line
  }, [currentUser.id]);

  const handleProfilePicChange = async (e) => {
    const selectedProfilePic = e.target.files[0];
    if (selectedProfilePic) {
      try {
        const data = new FormData();
        data.append('file', selectedProfilePic);
        data.append('upload_preset', 'V_world');
        data.append('cloud_name', 'dbpcfcpit');

        const response = await axios.post(cloudinary_url, data);
        const imageUrl = response.data.url;

        // Update the profile picture URL in the state
        setCurrentDp(imageUrl);

        // Send a patch request to update the profile URL on the server if needed
        await userAxios.patch(`${UserUrl}update_profile`, {
          profile_url: imageUrl,
        });

        updateLocalStorageProfileUrl(imageUrl)

        console.log('Profile picture uploaded successfully');
      } catch (error) {
        console.error('Error uploading profile picture', error);
      }
    }
  };

  return (
    <div className="bg-gray-800 w-screen h-screen text-white flex">
      {/* Sidebar component */}
      <Sidebar type="user" styleprop="profile" />
      <div className="w-4/5 h-screen p-4 flex flex-col justify-center items-center md:w-full">
        <div className="w-9/12 h-96 flex flex-col justify-center items-center border-b">
          {/* Profile pic */}
          <div className="w-48 h-48 flex justify-center items-center">
            <img
              src={currentDp}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
              onClick={() => document.getElementById('profilepic').click()}
            />
            <input
              type="file"
              id="profilepic"
              accept="image"
              style={{ display: 'none' }}
              onChange={handleProfilePicChange}
            />
          </div>
          {/* Username */}
          <h1 className="text-2xl font-semibold mt-2 mb-3">{currentUser.username}</h1>
          {/* Edit and View Archive Buttons */}
          <div className="flex mt-4">
            <button className="text-gray-200 mr-4 px-4 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md">
              Edit Profile
            </button>
            <button className="text-gray-200 mr-4 px-4 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md">
              View Archive
            </button>
          </div>
          {/* posts following followers */}
          <div className="flex mt-6">
            <div className="mr-6 text-center">
              <p className="font-semibold">{userData?.post_count}</p>
              <p className="text-gray-400">Posts</p>
            </div>
            <div className="mr-6 text-center">
              <p className="font-semibold">{userData?.followers_count}</p>
              <p className="text-gray-400">Followers</p>
            </div>
            <div className="text-center mb-9">
              <p className="font-semibold">{userData?.following_count}</p>
              <p className="text-gray-400">Following</p>
            </div>
          </div>
        </div>
        <div className='w-9/12 h-4/5 mt-10 overflow-y-scroll grid-cols-4 grid gap-2'>
        {userData &&
          userData.posts.map((post) => (
            <div className='relative' key={post.id}>
              <div style={{ paddingBottom: '100%' }}>
                {post.toLowerCase().endsWith('.mp4') ? (
                  // Render video for .mp4 files
                  <div>
                    <video
                      src={post}
                      alt='Video'
                      className='absolute inset-0 w-full h-full object-cover'
                    />
                    <FontAwesomeIcon icon={faPlay} className='absolute m-3 '/>
                  </div>
                ) : (
                  // Render image for other file types
                  <img
                    src={post}
                    alt='Image'
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                )}
              </div>
            </div>
          ))}
      </div>
           
      </div>
    </div>
  );
}

export default UserProfile;
