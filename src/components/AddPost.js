import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserAxios } from '../config/Header_request';
import axios from 'axios';
import { UserUrl } from '../APIs/BaseUrl';
import { addFeedItem } from '../Redux/feedSlice';

function AddPost({ closeModal }) {
  const [ isUploaded, setIsUploaded ] = useState(false)
  const [uploadedPost, setUploadedPost] = useState('');
  const user = useSelector((state) => state?.userDetails?.user);
  const userAxios = UserAxios();
  const dispatch = useDispatch()
  const [ show, setShow ] = useState('')
  const [ caption, setCaption ] = useState('')

  const handleUpload = (e) => {
    setIsUploaded(true);
    setShow(e.target.files[0])
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Update the 'uploadedPost' state with the URL of the selected file
      setUploadedPost(URL.createObjectURL(selectedFile));
    }
  };
  
  console.log(uploadedPost, 'consoling uploaded post')
  
  const uploadPost = async (e) => {
    closeModal()
    const selectedPostImageOrVideos = show;
    if(selectedPostImageOrVideos){
      try{
        const data = new FormData()
        data.append('file', selectedPostImageOrVideos)
        data.append('upload_preset', 'V_world')
        data.append('cloud_name','dbpcfcpit')
        const resourceType = selectedPostImageOrVideos.type === 'video/mp4' ? 'video' : 'image';
  
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dbpcfcpit/${resourceType}/upload`,data)
        console.log(response.data, "post upload response from couldinary")
        const post_url = response.data.url

        const serverResponse = await userAxios.post(UserUrl+'posts',{post_url, caption})
        console.log(serverResponse, "response from server (rails)")

        const post = serverResponse.data.post
        console.log(post, "added post data")

        dispatch(addFeedItem(post))
        
      }catch(error){
        console.error("Error uploading post",error)
      }
    }
  }

  const handleContendClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center backdrop-brightness-50 z-50" onClick={closeModal}>
        {/* image and video show here */}
        {isUploaded ? (
          <div className="w-auto h-auto bg-gray-800 flex rounded-xl" onClick={handleContendClick}>

            {/* left side (image and video) */}
            <div className='h-full w-3/5 rounded-xl'>
              <img
                className='object-cover rounded-xl'
                src={uploadedPost}
              />
            </div>

            <div className='w-2/5 rounded-xl'>
              {/* right side content */}
              <div className="flex items-center p-4 w-full justify-between border-b border-b-gray-600">
                <div className="flex items-center ms-3 mt-2 mb-3 cursor-pointer">
                  <img
                    src={user?.profile_url}
                    alt="User Profile"
                    className="w-9 h-9 rounded-full object-cover mr-2"
                  />
                  <span className="font-semibold text-white">
                    {user?.username}
                  </span>
                </div>
              </div>

              <div className='flex p-4 h-4/5 border-b border-b-gray-600'>
                <textarea
                  type='text'
                  placeholder='Add a caption ...'
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  style={{ whiteSpace: 'pre-wrap' }} 
                  className='bg-gray-800 w-full overflow-x-hidden text-white h-1/2'
                />
              </div>
              <button className='w-full bg-blue-700 p-3 rounded-br-xl hover:bg-blue-800'onClick={uploadPost}>
                POST
              </button>
            </div>
          </div>
        ) : (
          <div className='h-3/5 w-2/5 bg-gray-700 rounded-xl flex items-center justify-center flex-col'onClick={handleContendClick}>
            <div className=' h-12 w-full rounded-t-xl border-b border-b-gray-400 flex items-center font-semibold text-white pl-4'>
              Add your images and Videos
            </div>

            <div className='h-full flex items-center justify-center'>
              <div className='flex flex-col items-center border p-10 rounded-lg border-gray-400'>
                <lord-icon
                  src="https://cdn.lordicon.com/rcgrnzji.json"
                  trigger="hover"
                  state="hover-swirl"
                  stroke="bold"
                  style={{ width: '100px', height: '100px' , cursor: 'pointer'}}
                  onClick={()=> document.getElementById('post').click()}>
                </lord-icon>
                <input 
                  type='file'
                  id = 'post'
                  accept='image/*, video/*'
                  style={{display: 'none'}}
                  multiple
                  onChange={handleUpload}
                />
                <button className='px-3 py-1 text-white bg-blue-600 rounded-xl mt-5'
                  onClick={()=> document.getElementById('post').click()}
                >
                  Select from your devise
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
  );
}

export default AddPost;
