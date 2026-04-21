import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-blue-600 text-white flex justify-between items-center p-4'>
        <h1 className='text-2xl font-bold'>AI Ressume Builder</h1>
        <div className='space-x-6'>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </div>
    </nav>
  )
}

export default Navbar