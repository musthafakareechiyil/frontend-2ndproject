import React from 'react';
import Sidebar from '../../components/Sidebar';
import SuggestedUsers from '../../components/SuggestedUsers';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { UserUrl } from '../../APIs/BaseUrl';
import { UserAxios } from '../../config/Header_request';
import FeedItem from '../../components/FeedItem';
import { addFeedItem } from '../../Redux/feedSlice';

function Home() {
  const currentUser = useSelector((state) => state?.userDetails?.user)
  const userAxios = UserAxios();
  const dispatch = useDispatch()

  const uploadPost = async (e) => {
    const selectedPostImageOrVideos = e.target.files[0]
    console.log(selectedPostImageOrVideos, 'target from home ')
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

        const serverResponse = await userAxios.post(UserUrl+'posts',{post_url})
        console.log(serverResponse, "response from server (rails)")

        const post = serverResponse.data.post
        console.log(post, "added post data")

        dispatch(addFeedItem(post))
        
      }catch(error){
        console.error("Error uploading post",error)
      }
    }
  }

  return (
    <div className='min-h-screen bg-gray-800 flex '>

      {/* Sidebar component */}
      <Sidebar type="user" styleprop="home" />

      {/* home page */}
      <div className='w-4/5 flex justify-center'>

        {/* Feed component */} 
        <div className='overflow-y-auto max-w-2xl' style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          <FeedItem/>
        </div>
        
        {/*suggested users*/}
        <div className='flex flex-col m-9 text-gray-300 ml-10'>

          {/* suggestion */}
          <SuggestedUsers/>

        </div>

      </div> 
          
    </div>
  );
}

export default Home;
