import React, { useEffect, useState } from 'react'
import { UserAxios } from '../config/Header_request'
import { UserUrl } from '../APIs/BaseUrl'
import { Link } from 'react-router-dom'

function Following({ closeModal, user}) {
  const userAxios = UserAxios()
  const [ following, setFollowing ] = useState([])

  useEffect( () => {
    const following = async() => {
      const response = await userAxios.get(UserUrl+'following',{
        params: {
          id: user.id,
        }
      })
      setFollowing(response?.data)
      console.log(response, 'followers list consoling from followers')
    }
    following();
    // eslint-disable-next-line
  },[])
  return (
    <div className='h-full w-full fixed top-0 left-0 backdrop-brightness-50 flex justify-center items-center' onClick={closeModal}>
      <div className='bg-gray-800 w-1/6 max-h-96 rounded-lg overflow-y-auto p-4'>
      {following ? (
          <ul className='text-white'>
            {following?.map((user) => (
              <li key={user?.id} className="mb-2">
                <div className="flex items-center ">

                  {/* profile image */}
                  <img
                    src={user?.profile_url}
                    alt={user?.username}
                    className="w-10 h-10 object-cover rounded-full m-2 mr-4"
                  />

                  {/* username */}
                  <Link to={`/${user?.username}`}
                    className="text-white"
                  >
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
  )
}

export default Following
