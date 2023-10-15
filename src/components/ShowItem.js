import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeedItemModal from './FeedItemModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function ShowItem({ feedItem, closeModal }) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ feed, setFeed ] = useState('') 

  const closeShowModal = () => {
    setIsOpen(false)
  }

  const handleContendClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-brightness-75" onClick={closeModal}>
      <div className="w-3/5 h-4/5 bg-gray-900 flex"onClick={handleContendClick}>

        {/* image and video show here */}
        <div className="w-3/5 h-full flex">
          {console.log(feedItem,'feedItems inside the post show')}
          {feedItem.post_url.toLowerCase().endsWith('.mp4') ? (
            // Video rendering
            <div>
              <video autoPlay muted className="w-full h-full object-cover">
                <source src={feedItem.post_url} type="video/mp4" />
              </video>
            </div>
          ) : (
            // Image rendering
            <img src={feedItem.post_url} className="w-full h-full object-cover" alt="Post" />
          )}
        </div>

        {/* right side */}
        <div className=' w-2/5'>
          
          {/* username , profile_url and 3 dots*/}
          <div className="flex items-center p-4 w-full justify-between border-b border-b-gray-600">

            {/* profile icon and username */}
            <Link to={`${feedItem?.user?.username}`} className="flex items-center ms-3 mt-2 mb-3 cursor-pointer">
              <img
                src={feedItem.user.profile_url}
                alt="User Profile"
                className="w-9 h-9 rounded-full object-cover mr-2"
              />
              <span className="font-semibold text-white">
                {feedItem.user.username}
              </span>
            </Link>
            
            {/* 3 dots */}
            <div>
                <button
                  className="text-white"
                  onClick={() => {
                    setFeed(feedItem)
                    setIsOpen(true);
                  }}
                >
                  <svg className="h-6 w-6 transform transition-transform hover:scale-110 duration-300">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </svg>
                </button>

                {/* Conditionally render FeedItemModal with the selected feed.id */}
                {isOpen && (
                  <FeedItemModal feedItem={feed} closeModal={closeShowModal}/>
                )}
            </div>

          </div>

          {/* comments show section */}
          <div></div>

          {/* like archive button with count */}
          <div></div>

          {/* add comment section */}
          <div></div>

        </div>
        
      </div>
    </div>
  );
}

export default ShowItem;
