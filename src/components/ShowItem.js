import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeedItemModal from './FeedItemModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import useToggleLike from './useTogleLike';

function ShowItem({ feedItem, closeModal ,userData}) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ feed, setFeed ] = useState('')
  const { toggleLike } = useToggleLike() 

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
            <Link to={`/${(feedItem?.user || userData)?.username}`} className="flex items-center ms-3 mt-2 mb-3 cursor-pointer">
              <img
                src={(feedItem.user || userData)?.profile_url}
                alt="User Profile"
                className="w-9 h-9 rounded-full object-cover mr-2"
              />
              <span className="font-semibold text-white">
                {(feedItem?.user || userData)?.username}
              </span>
            </Link>
            
            {/* 3 dots */}
            <div>
                <button
                  className="text-white"
                  onClick={() => {
                    setFeed(feedItem || userData)
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
          <div className='flex  p-4 h-4/5 border-b border-b-gray-600'>

            {/* user profile div */}
            <div className='rounded-full h-9 w-9 bg-white mt-2 ml-3 mr-3'>
              <img src=''/>
            </div>
            
            {/* username and comment */}
            <div>
              <p className='font-bold'>username</p>
              <p className='font-light w-full h-auto'>comments here</p>
            </div>

          </div>
          
          {/* like and archive div */}
          {/* <div className='p-4 m-3'> */}

            {/* like archive button with count */}
            {/* <button
              className={` transform transition-transform hover:scale-110 duration-300 mr-2`}
              onClick={() => toggleLike(feedItem.id, 'Post')}
            >
              {feedItem?.liked ? (
                <lord-icon
                  src="https://cdn.lordicon.com/gfabuoru.json"
                  trigger="hover"
                  state="hover-match"
                  colors="primary:#c71f16,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#f24c00"
                />
              ):(
                <lord-icon
                  src="https://cdn.lordicon.com/gfabuoru.json"
                  trigger="morph"
                  state="morph-two-hearts"
                  colors="primary:#ffffff,secondary:#911710,quaternary:#e83a30"
                />
              )}     
            </button> */}

            {/* archive button */}
            {/* <button className="text-gray-200 transform transition-transform hover:scale-110 duration-300">
              <lord-icon
                src="https://cdn.lordicon.com/prjooket.json"
                trigger="morph"
                state="morph-marked-bookmark"
                colors="primary:#ffffff"
              />
            </button> */}

            {/* likes and comments count */}
            {/* {feedItem?.likes_count > 0 &&(
              <div>
              <p>{feedItem.likes_count} {feedItem.likes_count === 1 ? 'Like' : 'Likes'}</p>
            </div>
            )} */}


          {/* </div> */}

          {/* add comment section */}
          <div className="flex p-4">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 text-white bg-gray-700 rounded-3xl"
            />
            <button
              className="text-blue-600 ml-2 bg-transparent hover:text-white"
              onClick={() => {
                // Add your logic to post a comment here
              }}
            >
              Post
            </button>
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default ShowItem;
