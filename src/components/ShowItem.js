import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeedItemModal from './FeedItemModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { UserAxios } from '../config/Header_request';
import { UserUrl } from '../APIs/BaseUrl';

function ShowItem({ feedItem, closeModal , userData, onDelete}) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ feed, setFeed ] = useState('')
  const [ newComment, setNewComment ] = useState('')
  const userAxios = UserAxios()

  const addComment = async () => {
    try{
      const response = await userAxios.post(UserUrl+'comments',{
        comment: {
          commentable_type: 'Post',
          commentable_id: feed?.id,
          body: newComment
        }
      })
      setNewComment('')
      console.log(response, 'response from adding new comment')
    }catch(e){
      console.error('Error while adding comment', e)
    }
  }

  const closeShowModal = () => {
    setIsOpen(false)
    closeModal()
  }

  const handleContendClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-brightness-50" onClick={closeModal}>
      <div className="w-3/5 h-4/5 bg-gray-900 flex rounded-xl"onClick={handleContendClick}>

        {/* image and video show here */}
        <div className="w-3/5 h-full flex ">
          {feedItem?.post_url?.toLowerCase().endsWith('.mp4') ? (
            // Video rendering
            <div>
              <video autoPlay muted className="w-full h-full object-cover rounded-xl">
                <source src={feedItem?.post_url} type="video/mp4" />
              </video>
            </div>
          ) : (
            // Image rendering
            <img src={feedItem?.post_url} className="w-full h-full object-cover rounded-xl" alt="Post" />
          )}
        </div>

        {/* right side */}
        <div className=' w-2/5 rounded-xl'>
          
          {/* username , profile_url and 3 dots*/}
          <div className="flex items-center p-4 w-full justify-between border-b border-b-gray-600">

            {/* profile icon and username */}
            <Link to={`/${(feedItem?.user || userData?.user)?.username}`} className="flex items-center ms-3 mt-2 mb-3 cursor-pointer">
              <img
                src={(feedItem.user || userData?.user)?.profile_url}
                alt="User Profile"
                className="w-9 h-9 rounded-full object-cover mr-2"
              />
              <span className="font-semibold text-white">
                {(feedItem?.user || userData?.user)?.username}
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
                  <FeedItemModal feedItem={feed} closeModal={closeShowModal} onDelete = {onDelete}/>
                )}
            </div>  

          </div>

          {/* comments show section */}
          <div className='flex  p-4 h-4/5 border-b border-b-gray-600'>

            {/* user profile div */}
            <div className='rounded-full h-9 w-9 bg-white mt-2 ml-3 mr-3'>
              {/* <img src=''/> */}
            </div>
            
            {/* username and comment */}
            <div>
              <p className='font-bold'>username</p>
              <p className='font-light w-full h-auto'>comments here</p>
            </div>

          </div>

          {/* add comment section */}
          <div className="flex p-3 mb-5">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 text-white bg-gray-700 rounded-3xl"
              value={newComment}
              onChange={(e) => {
                setFeed(feedItem || userData)
                setNewComment(e.target.value)
              }}
            />
            <button
              className="text-blue-600 ml-2 bg-transparent hover:text-white"
              onClick={() => {
                addComment()
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
