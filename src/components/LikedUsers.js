import React, { useState, useEffect } from 'react';
import { UserAxios } from '../config/Header_request';
import { UserUrl } from '../APIs/BaseUrl';
import { Link } from 'react-router-dom';

function LikedUsers({ closeModal, feedItem }) {
  const userAxios = UserAxios();
  const [likedUsersData, setLikedUsersData] = useState(null);

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const response = await userAxios.get(UserUrl + 'likes', {
          params: {
            likable_id: feedItem.id,
            likable_type: 'Post',
          },
        });
        setLikedUsersData(response.data);
        console.log(response.data, 'liked users');
      } catch (error) {
        console.error('error while fetching liked users', error);
      }
    };

    fetchLikedUsers();
  // eslint-disable-next-line
  }, []);


  return (
    <div className='top-0 left-0 fixed h-full w-full backdrop-brightness-75 flex justify-center items-center' onClick={closeModal}>
      <div className='absolute max-h-96 w-1/6 bg-gray-800 rounded-lg p-4 overflow-y-auto'>
        {likedUsersData ? (
          <ul className='text-white'>
            {likedUsersData?.map((user) => (
              <li key={user?.user?.id} className="mb-2">
                <div className="flex items-center ">

                  {/* profile image */}
                  <img
                    src={user?.user.profile_url}
                    alt={user?.user.username}
                    className="w-10 h-10 object-cover rounded-full m-2 mr-4"
                  />

                  {/* username */}
                  <Link to={`/${user?.user?.username}`}
                    className="text-white"
                  >
                    <p className='font-bold'>{user?.user?.username}</p>
                    <p className='text-gray-400'>{user?.user?.fullname}</p>
                  </Link>
                  
                </div>
              </li>
            ))}
          </ul>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
}

export default LikedUsers;
