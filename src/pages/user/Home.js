import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Feed from '../../components/FeedItem';
import SuggestedUsers from '../../components/SuggestedUsers';
import axios from 'axios';


function Home() {
  const [ image, setImage ] = useState(null)

  const submitImage = async() => {
    try{
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","V_world")
      data.append("clound_name","dbpcfcpit")

      const response = await axios.post("https://api.cloudinary.com/v1_1/dbpcfcpit/image/upload",data)
      console.log(response.data.url)
    }catch(e){
      console.log(e, "error occured")
    }
  }

  return (
    <div className='min-h-screen bg-gray-800 flex '>
      {/* Sidebar component */}
      <Sidebar type="user" styleprop="home" />
      {/* Feed component */} 
      <div className='w-4/5 flex'>
        <div className='overflow-y-auto w-2/3' style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          <Feed />
        </div>
        {/* suggestion */}
        <div>
          <SuggestedUsers/>
          <input 
            className='text-white py-2 bg-gray-700 rounded-md cursor-pointer'
            type='file'
            onChange={(e) => setImage(e.target.files[0])}            
          />
          <button
            className='p-2 bg-gray-700 text-white'
            onClick={submitImage}
          >uplaod</button>

        </div>
      </div>     
    </div>
  );
}

export default Home;
