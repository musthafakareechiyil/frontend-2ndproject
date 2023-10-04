import React, { useEffect, useState } from 'react';
import { UserAxios } from '../config/Header_request';
import { UserUrl } from '../APIs/BaseUrl';
import { useSelector } from 'react-redux';

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]); // New state to track followed users
  const [seeAll, setSeeAll] = useState(false); // State to track "See All" click
  const userAxios = UserAxios();
  const currentUser = useSelector((state) => state?.userDetails?.user);

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

  // follow user

  const followUser = async (username) => {
    try {
      const response = await userAxios.post(UserUrl + `${username}/follow_user`);
      console.log(response, "You have followed the user successfully");
      // Add the followed user to the followingUsers state
      setFollowingUsers([...followingUsers, username]);
    } catch (error) {
      console.error("Error while following user:", error);
    }
  };

  // unfollow user

  const unfollowUser = async (username) => {
    try {
      const confirmUnfollow = window.confirm(`Are you sure you want to unfollow ${username}`)
      if (confirmUnfollow) {
        const response = await userAxios.post(UserUrl + `${username}/unfollow_user`)
        console.log(response);
        // Remove the unfollowed user from the followingUsers state
        setFollowingUsers(followingUsers.filter(user => user !== username));
      }
    } catch (error) {
      console.error("Error while unfollowing user", error);
    }
  }

  return (
    <div className="bg-gray-800 mt-8 w-64">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-gray-500 text-sm font-semibold mr-5">Suggested for You</h2>
        <button
          className="text-blue-500 hover:bg-gray-700 px-2 rounded-md"
          onClick={() => setSeeAll(true)}
        >
          See All
        </button>
      </div>
      <ul>
        {users && users.slice(0, seeAll ? users.length : 5).map((user) => (
          <li key={user.id} className="flex items-center justify-between py-2 mb-1 cursor-pointer">
            <div className="flex items-center">
              <img
                src={user.profile_url}
                alt={`Profile of ${user.username}`}
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span className="text-white">{user.username}</span>
            </div>
            {followingUsers.includes(user.username) ? (
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md cursor-pointer"
                onClick={() => unfollowUser(user.username)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className={`bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-1 rounded-md cursor-pointer`}
                onClick={() => followUser(user.username)}
                disabled={followingUsers.includes(user.username)}
              >
                {followingUsers.includes(user.username) ? 'Following' : 'Follow'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedUsers;
