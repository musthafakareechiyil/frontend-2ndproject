import React from 'react';
import Sidebar from '../../components/Sidebar';
import SuggestedUsers from '../../components/SuggestedUsers';
import FeedItem from '../../components/FeedItem';

function Home() {

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
