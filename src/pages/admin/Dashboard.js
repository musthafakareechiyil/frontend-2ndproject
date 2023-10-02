import React from 'react'
import Sidebar from '../../components/Sidebar'

function Dashboard() {
  return (
    <div className='bg-gray-800 h-screen text-white flex'>
      <Sidebar type = "admin" styleprop = "dashboard"/>
    </div>
  )
}

export default Dashboard
