import React from 'react'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { GoArrowUpRight } from 'react-icons/go'

const RecentlyBooked = () => {
  return (
    <div className='grid grid-rows-4 gap-3 border border-slate-300 p-4 rounded'>
        <div className='flex items-center justify-between px-4 py-3 border-b border-slate-300'>
            <div className='flex gap-3 items-center'>
                <FaRegCalendarCheck className='h-5 w-5' />
                <h3 className='text-lg'>Recently Booked</h3>
            </div>
            <p className='text-blue-500 cursor-pointer'>See all</p>
        </div>
        <div className='grid grid-cols-[repeat(5,minmax(0,1fr))] px-4 py-3'>
            <p className='text-slate-500'>Name</p>
            <p className='text-slate-500'>Date</p>
            <p className='text-slate-500'>Time</p>
            <p className='text-slate-500'>Domain</p>
            <p className='text-slate-500'>Additional Info</p>
        </div>
        <div className='grid grid-cols-[repeat(5,minmax(0,1fr))] px-4 py-3 '>
            <p className=''>Manisha Chaudhary</p>
            <p className=''>12 Sept 2024</p>
            <p className=''>1:00 pm</p>
            <p className=''>Resume Review</p>
            <div className='flex gap-2 items-center'>
                <span className='px-1 border-b border-blue-500 flex gap-1 items-center cursor-pointer'>
                    <p className='text-blue-500'>View</p>
                    <GoArrowUpRight className='w-5 h-5 text-blue-500' />
                </span>
            </div>
        </div>
        <div className='grid grid-cols-[repeat(5,minmax(0,1fr))] px-4 py-3 '>
            <p className=''>Manas Patil</p>
            <p className=''>8 Sept 2024</p>
            <p className=''>11:00 am</p>
            <p className=''>AIML</p>
            <div className='flex gap-2 items-center'>
                <span className='px-1 border-b border-blue-500 flex gap-1 items-center cursor-pointer'>
                    <p className='text-blue-500'>View</p>
                    <GoArrowUpRight className='w-5 h-5 text-blue-500' />
                </span>
            </div>
        </div>
        <div className='grid grid-cols-[repeat(5,minmax(0,1fr))] px-4 py-3 '>
            <p className=''>Gouravi Bhosale</p>
            <p className=''>11 Nov 2024</p>
            <p className=''>4:00 pm</p>
            <p className=''>Interview</p>
            <div className='flex gap-2 items-center'>
                <span className='px-1 border-b border-blue-500 flex gap-1 items-center cursor-pointer'>
                    <p className='text-blue-500'>View</p>
                    <GoArrowUpRight className='w-5 h-5 text-blue-500' />
                </span>
            </div>
        </div>
    </div>
  )
}

export default RecentlyBooked