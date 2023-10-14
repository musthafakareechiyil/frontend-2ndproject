import React, { useEffect, useState } from 'react';
import { UserAxios } from '../config/Header_request';
import { UserUrl } from '../APIs/BaseUrl';
import { useSelector } from 'react-redux';
import useFollowUnfollow from './useFollowUnfollow.js';
import { Link } from 'react-router-dom';

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [seeAll, setSeeAll] = useState(false); // State to track "See All" click
  const userAxios = UserAxios();
  const currentUser = useSelector((state) => state?.userDetails?.user);
  const { followingUsers, followUser, unfollowUser } = useFollowUnfollow([])

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await userAxios.get(UserUrl + 'users');
        // Filter out the current user from the response data
        const filteredUsers = response.data.filter(user => user.id !== currentUser.id)
        setUsers(filteredUsers);
        console.log(response, "retrieving users data");
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchSuggestedUsers();
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div className="bg-gray-800 mt-8">

      {/* div contains see all and seggested head section */}
      <div className="flex items-center justify-between mb-2">

        {/* suggested for you head */}
        <h2 className="text-gray-500 text-sm font-semibold mr-28">Suggested for You</h2>

        {/* conditional render for see all and less buttons */}
        { seeAll === true ? (

          // see less button
          <button
            className="text-blue-500 hover:text-white text-sm"
            onClick={() => setSeeAll(false)}
          >
            See Less
          </button>

        ):(
          
          // see all button
          <button
            className="text-blue-500 hover:text-white text-sm"
            onClick={() => setSeeAll(true)}
          >
            See All
          </button>

        )}

      </div>

      {/* listing users */}
      <ul>

        {/* maping users */}
        {users && users.slice(0, seeAll ? users.length : 5).map((user) => (
          <li key={user.id} className="flex items-center justify-between py-2 mb-1 cursor-pointer">
          
            {/* image and username section link added */}
            <Link to={`${user.username}`} className='flex items-center'>

              <img
                src={user.profile_url}
                alt={`Profile of ${user.username}`}
                className="w-8 h-8 rounded-full object-cover mr-2"
              />

              <span className="text-white">{user.username}</span>

            </Link>
          
            {/* conditionally rendering follow and following buttons */}
            {followingUsers.includes(user?.username) ? (

              // following action
              <button
                className="text-blue-500 hover:text-white cursor-pointer transform hover:scale-105 text-sm"
                onClick={() => unfollowUser(user?.username)}
              >
                Following
              </button>
              
            ) : (

              // unfollow action
              <button
                className={` hover:text-white text-blue-500 cursor-pointer hover:scale-105 text-sm`}
                onClick={() => followUser(user?.username)}
                disabled={followingUsers.includes(user?.username)}
              >
                Follow
              </button>

            )}

          </li>
        ))}
      </ul>

    </div>
  );
};


export default SuggestedUsers;
