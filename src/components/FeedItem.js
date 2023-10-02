import { faComment, faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

function FeedItem({ imageSrc, username }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-gray-900 text-white p-1 mx-24 mt-9 shadow-2xl rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center ms-3 mt-2 mb-3">
          <img
            src={imageSrc}
            alt="User Profile"
            className="w-9 h-9 rounded-full object-cover mr-2"
          />
          <span className="font-semibold">{username}</span>
        </div>
        <div>
          <button className="text-white">
            <svg
              className="h-6 w-6"
            >
            <FontAwesomeIcon icon={faEllipsisVertical}/>
            </svg>
          </button>
        </div>
      </div>
      <img src={imageSrc} alt="Post" className="w-full" />

      <div className="flex justify-between mt-4 mb-2 mx-2">
        <div>
          <button
            className={`text-gray-200 ${liked ? 'text-red-500' : ''}`}
            onClick={toggleLike}
          >
              {liked ? (
                <FontAwesomeIcon icon={faHeart} style={{color: "#ff0000"}} className="h-6 w-6" />
              ) : (
                <FontAwesomeIcon icon={faHeart} className="h-6 w-6"/>
              )}
          </button>
          <button className="text-gray-200 ml-2">
            <FontAwesomeIcon icon={faComment} flip="horizontal" className='h-6 w-6 ml-2'/>
          </button>
        </div>
        <button className="text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Feed() {
  // Sample data for the feed items
  const feedItems = [
    {
      id: 1,
      imageSrc: 'https://imgs.search.brave.com/fXd4lPQ-VGV-38zBBz8Qwp-6YXaRcPDoK2GEZaU599g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvSG9t/ZVBhZ2UvRm91clBh/Y2svQzItUGhvdG9z/LWlTdG9jay0xMzU2/MTk3Njk1LmpwZw',
      username: 'User1',
    },
    {
      id: 2,
      imageSrc: 'https://imgs.search.brave.com/GLmoOADPgCQ7oGcz2z7XgLxc5kuEAZNpjEzuGe3Rnac/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTM4/NjYwNC9wZXhlbHMt/cGhvdG8tMTM4NjYw/NC5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA',
      username: 'User2',
    },
    {
      id: 3,
      imageSrc: 'https://res.cloudinary.com/dbpcfcpit/image/upload/v1696220925/V-logo-removebg-preview_rjpizi.png',
      username: 'User2',
    },
    // Add more items as needed
  ];

  return (
    <div>
      {feedItems.map((item) => (
        <FeedItem key={item.id} imageSrc={item.imageSrc} username={item.username} />
      ))}
    </div>
  );
}
