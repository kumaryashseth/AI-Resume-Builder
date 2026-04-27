import React from 'react'
import Navbar from '../components/Navbar'
import { getUser } from '../services/Auth'

const Dashboard = () => {
  const user=getUser();
  return (
    <>
    

    <div className='p-10'>
      <h1 className='text-4xl font-bold mb-6'>Dashboard</h1>
      <p className='mt-4 text-lg'>
        Welcome {user?.name}
      </p>

    <div className='grid grid-cols-3 gap-4'>
      <div className='bg-white p-6 shadow rounded-lg'>
        <h2 className='text-xl font-bold'>Create Resume</h2>
      </div>
      <div className='bg-white p-6 shadow rounded-lg'>
        <h2 className='text-xl font-bold'>My Resume</h2>
      </div>
      <div className='bg-white p-6 shadow rounded-lg'>
        <h2 className='text-xl font-bold'>Profile</h2>
      </div>
    </div>

    </div>
    </>
  )
}

export default Dashboard