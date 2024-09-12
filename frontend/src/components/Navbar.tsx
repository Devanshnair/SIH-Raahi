import React from 'react'
import { BiRightArrow } from 'react-icons/bi'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
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
          <button className='px-4 py-[5px] border-[1.5px] border-slate-900 font-medium rounded-full flex justify-center items-center gap-2 shadow-md overflow-hidden relative Loginnav'>
            <p className='z-20'>Sign Up</p>
            <HiOutlineArrowNarrowRight className='iconarrowright z-20 h-[1.4rem] w-[1.4rem]'/>
          </button>
        </Link>
    </div>
  )
}

export default Navbar