import React from 'react'
import { useSelector } from 'react-redux'
import { UserAxios } from '../config/Header_request'
import { UserUrl } from '../APIs/BaseUrl'

function FeedItemModal({ feedItem, closeModal }) {
  const currentUser = useSelector((state) => state?.userDetails.user.username)
  const userAxios = UserAxios()
  
  const deleteFeed = async() => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete your post ?!')
      if (confirmDelete){
        const response = await userAxios.delete(UserUrl+`posts/${feedItem.id}`)
        console.log(response)
      }
    }catch(error){
      console.error("Failed to delete feed", error)
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-brightness-50'
      onClick={closeModal}
    >
      <div className='absolute w-72 h-auto rounded-md shadow-2xl'>
        { currentUser === feedItem.user.username ? (
          <p className='w-full h-12 bg-gray-800 border-b border-gray-700 rounded-t-md flex justify-center items-center hover:bg-gray-700 text-red-500 cursor-pointer'
            onClick={deleteFeed}
          >
            Delete
          </p>
        ):(
          <p className='w-full h-12 bg-gray-800 border-b border-gray-700 rounded-t-md flex justify-center items-center hover:bg-gray-700 text-red-500 cursor-pointer'>
            Unfollow
          </p>
        )} 
        <p className='w-full h-12 bg-gray-800 border-b border-gray-700 flex justify-center items-center hover:bg-gray-700 cursor-pointer'>
          Save post
        </p>
        <p className='w-full h-12 bg-gray-800 flex border-b border-gray-700 justify-center items-center hover:bg-gray-700 cursor-pointer'>
          View post
        </p>
        <p className='w-full h-12 bg-gray-800 flex border-b border-gray-700 justify-center items-center hover:bg-gray-700 cursor-pointer'>
          View profile
        </p>
        <p className='w-full h-12 bg-gray-800 rounded-b-md flex justify-center items-center hover:bg-gray-700 text-red-500 cursor-pointer'
          onClick={closeModal}
        >
          Cancell
        </p>
      </div>
    </div>
  )
}

export default FeedItemModal
