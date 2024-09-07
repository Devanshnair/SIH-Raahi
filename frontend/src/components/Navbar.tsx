import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-52 bg-slate-100'>
        <div className='h-24'>
            <img src='../../src/assets/LogoTemp.png' alt='Logo' className='h-[100%] object-cover' />
        </div>
        <div>
            <ul className='flex gap-10 justify-center items-center'>
                <li className='text-lg tracking-wide cursor-pointer relative Homenav '>Home</li>
                <li className='text-lg tracking-wide cursor-pointer relative Explorenav'><Link to={"/mentors/explore"}>Explore</Link></li>
                <li className='text-lg tracking-wide cursor-pointer relative Insightsnav'><Link to={"/mentors/reels"}>Insights</Link></li>
            </ul>
        </div>
        <Link to={"/register"}>
          <button className='px-6 py-1 border-[1.5px] border-slate-900 text-xl rounded-full flex justify-center items-center shadow-md overflow-hidden relative Loginnav'><p className='z-20'>Login</p></button>
        </Link>
    </div>
  )
}

export default Navbar