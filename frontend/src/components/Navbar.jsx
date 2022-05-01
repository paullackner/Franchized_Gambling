import React, {useState} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'

const Navbar = () => {

    const [nav, setNav] = useState(false)

    const handleNav = () => {

        setNav(!nav)

    }

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>GAMBLING.</h1>
        <ul className='hidden md:flex'>
            <li className='p-4'>Home</li>
            <li className='p-4'>Overview</li>
            <li className='p-4'>Game</li>
            <li className='p-4'>About</li>
            <li className='p-4'>Login</li>
        </ul>

        <div onClick={handleNav} className='block md:hidden'>
            {!nav ? <FaBars size={20}/> : <FaTimes size={20}/>}
            {/* className='block md:hidden' */}
        </div>

        <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#01283f] case-in-out duration-500' : 'fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>GAMBLING.</h1>
            <ul className='uppercase p-4'>
                <li className='p-4 border-b border-gray-600'>Home</li>
                <li className='p-4 border-b border-gray-600'>Overview</li>
                <li className='p-4 border-b border-gray-600'>Game</li>
                <li className='p-4 border-b border-gray-600'>About</li>
                <li className='p-4'>Login</li>
            </ul>
        </div>

    </div>
  )
}

export default Navbar