import React from 'react'
import { useSelector } from 'react-redux'


function Home() {
  const user = useSelector((state)=> state.userDetails.token)
  return (
    <div className='min-h-screen bg-gray-800'>
      <h1>{user}</h1>
    </div>
  )
}

export default Home
