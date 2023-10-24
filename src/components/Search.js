import React, { useEffect, useState } from 'react'
import { UserAxios } from '../config/Header_request'
import { UserUrl } from '../APIs/BaseUrl'
import { Link } from 'react-router-dom'

function Search({ closeModal }) {
  const [ searchKey, setSearchKey ] = useState('')
  const userAxios = UserAxios()
  const [ searchResult, setSearchResult ] = useState('')

  useEffect ( () => {
    const search = async () => {
      try {
        const response = await userAxios.get( UserUrl+ `search?key=${searchKey}`) 
        console.log(response, " search result from search.js")
        setSearchResult(response?.data)
      }catch (e) {
        console.error("Failed to search ", e)
      }
    }
    search()
  },[searchKey])

  return (
    <div className='backdrop-brightness-50 flex justify-center items-center fixed z-50 h-full w-full top-0 left-0' onClick={closeModal}>
      <div className='bg-gray-800 w-1/5 h-3/5 rounded-xl flex flex-col' onClick={(e) => e.stopPropagation()}>
        <h1 className='font-bold text-white text-lg p-2 m-2 border-gray-400 w-full'>Search users</h1>
        <div className='p-3 border-b border-b-gray-500 mb-4'>
          <input
            type='text'
            placeholder='Search'
            className='w-4/5 bg-gray-700 rounded-3xl curso p-2 text-white items-center mb-4'
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <div className="search-results p-3" style={{ overflowY: 'auto', maxHeight: '70%', width: '100%' }}>
          {searchResult ? (
            <ul className='text-white'>
              {searchResult?.map((user) => (
                <li key={user?.id} className="mb-2">
                  <div className="flex items-center ">
  
                    {/* profile image */}
                    <img
                      src={user?.profile_url}
                      alt={user?.username}
                      className="w-10 h-10 object-cover rounded-full m-2 mr-4"
                    />
  
                    {/* username */}
                    <Link to={`/${user?.username}`} className="text-white">
                      <p className='font-bold'>{user?.username}</p>
                      <p className='text-gray-400'>{user?.fullname}</p>
                    </Link>
                    
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  );
  
}

export default Search
