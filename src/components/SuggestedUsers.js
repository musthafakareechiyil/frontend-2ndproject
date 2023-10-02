import React from 'react';

const SuggestedUsers = () => {
  // Sample data for suggested users
  const suggestedUsers = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
    { id: 4, username: 'user4' },
    { id: 5, username: 'user5' },
    { id: 6, username: 'user6' },
    { id: 7, username: 'user7' },

  ];

  return (
    <div className="bg-gray-800 mt-8 w-64">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-gray-500 text-sm font-semibold mr-5">Suggested for You</h2>
        <button className="text-blue-500 hover:bg-gray-700 px-2 rounded-md">See All</button>
      </div>
      <ul>
        {suggestedUsers.map((user) => (
          <li key={user.id} className="flex items-center justify-between py-2 mb-1 cursor-pointer">
            <div className="flex items-center">
              <img
                src={`https://example.com/profile-images/${user.username}.jpg`} // Replace with the actual image URL
                alt={`Profile of ${user.username}`}
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span className="text-white">{user.username}</span>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-1 rounded-md">Follow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedUsers;
