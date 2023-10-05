import React from 'react';
import Sidebar from '../../components/Sidebar';
import SuggestedUsers from '../../components/SuggestedUsers';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { UserUrl } from '../../APIs/BaseUrl';
import { UserAxios } from '../../config/Header_request';
import FeedItem from '../../components/FeedItem';

function Home() {
  const currentUser = useSelector((state) => state?.userDetails?.user)
  const userAxios = UserAxios();

  const uploadPost = async (e) => {
    const selectedPostImageOrVideos = e.target.files[0]
    if(selectedPostImageOrVideos){
      try{
        const data = new FormData()
        data.append('file', selectedPostImageOrVideos)
        data.append('upload_preset', 'V_world')
        data.append('cloud_name','dbpcfcpit')
        const resourceType = selectedPostImageOrVideos.type === 'video/mp4' ? 'video' : 'image';
  
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dbpcfcpit/${resourceType}/upload`,data)
        console.log(response.data.url)
        const post_url = response.data.url

        await userAxios.post(UserUrl+'posts',{post_url})
        
      }catch(error){
        console.error("Error uploading post",error)
      }
    }
  }
  console.log(currentUser)
  return (
    <div className='min-h-screen bg-gray-800 flex '>
      {/* Sidebar component */}
      <Sidebar type="user" styleprop="home" />
      <div className='w-4/5 flex'>
        {/* Feed component */} 
        <div className='overflow-y-auto w-2/3' style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          <FeedItem/>
        </div>
        
        <div className='flex flex-col m-9 text-gray-300'>
          <div className=' bg-gray-900 p-4 shadow-2xl rounded-lg'>
            Hai <span className='font-semibold'>{currentUser.username}</span>, do you <br/> want to add a post ?<br/>
            <FontAwesomeIcon icon={faArrowUpFromBracket} className='h- w-20 p-2 hover:bg-gray-700 rounded-full cursor-pointer border-4 border-green-700 ml-20 mt-5 mb-5'
              onClick={()=> document.getElementById('post').click()}
            />

            <input 
              type='file'
              id = 'post'
              accept='image/*, video/*'
              style={{display: 'none'}}
              multiple
              onChange={uploadPost}
            />

          </div>
          {/* suggestion */}
          <SuggestedUsers/>
        </div>
        {/* add post */}
      </div>     
    </div>
  );
}

export default Home;
