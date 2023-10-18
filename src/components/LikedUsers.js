import React, { useState, useEffect } from 'react';
import { UserAxios } from '../config/Header_request';
import { UserUrl } from '../APIs/BaseUrl';

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
  }, []);

  return (
    <div
      className='top-0 left-0 fixed h-full w-full backdrop-brightness-75 flex justify-center items-center'
      onClick={closeModal}
    >
      <div className='absolute h-1/2 w-1/5 bg-gray-800 rounded-lg'>
        {likedUsersData ? (
          <ul className='text-white'>
            {likedUsersData?.map((user) => (
              <li key={user.user.id}>{user.user.username}</li>
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
