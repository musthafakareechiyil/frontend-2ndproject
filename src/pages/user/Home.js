import React from 'react';
import Sidebar from '../../components/Sidebar';
import Feed from '../../components/FeedItem';
import SuggestedUsers from '../../components/SuggestedUsers';

function Home() {
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
        </div>
      </div>     
    </div>
  );
}

export default Home;
