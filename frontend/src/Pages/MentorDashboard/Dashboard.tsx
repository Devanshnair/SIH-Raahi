import React from 'react'
import { BsCalendar4Week } from 'react-icons/bs'
import { IoStarOutline } from 'react-icons/io5'
import { LiaCertificateSolid } from 'react-icons/lia'
import { PiHourglass } from 'react-icons/pi'

const Dashboard = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full bg-slate-100'>
        <div className='flex gap-4'>
            <div className='flex flex-col gap-7'>
                <h2 className='text-4xl'>Overview</h2>
                <div className='flex justify-center items-center gap-14 w-fit h-fit p-10 bg-slate-200 shadow-lg rounded-2xl'>
                    <div className=' flex flex-col'>
                        <div className='h-20 w-20 rounded-full overflow-hidden'>
                            <img src='../../../src/assets/explore5.png' alt='userimage' className='h-[100%] object-cover'/>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-lg'>Ramesh Rao</p>
                            <p className='text-sm text-slate-500'>Mentor &#9679; Software</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 grid-rows-2'>
                        <div className='flex justify-start items-center gap-4 p-8 border-r-2 border-b-2 border-slate-300'>
                            <div className='flex justify-center items-center rounded-full bg-blue-400 p-3'><BsCalendar4Week className='h-6 w-6'/></div>
                            <div className='flex flex-col'>
                                <p className='text-2xl font-medium'>08</p>
                                <p className='text-sm text-slate-500'>Upcoming meetings</p>
                            </div>
                        </div>
                        <div className='flex justify-start items-center gap-4 pl-8 border-b-2 border-slate-300'>
                            <div className='flex justify-center items-center rounded-full bg-teal-400 p-3'><LiaCertificateSolid className='h-7 w-7'/></div>
                            <div className='flex flex-col'>
                                <p className='text-2xl font-medium'>112</p>
                                <p className='text-sm text-slate-500'>Total sessions completed</p>
                            </div>
                        </div>
                        <div className='flex justify-start items-center gap-4 pl-8 border-r-2 border-slate-300'>
                            <div className='flex justify-center items-center rounded-full bg-yellow-400 p-3'><IoStarOutline className='h-6 w-6'/></div>
                            <div className='flex flex-col'>
                                <p className='text-2xl font-medium'>4.7</p>
                                <p className='text-sm text-slate-500'>Average Rating</p>
                            </div>
                        </div>
                        <div className='flex justify-start items-center gap-4 pl-8'>
                            <div className='flex justify-center items-center rounded-full bg-red-400 p-3'><PiHourglass className='h-6 w-6'/></div>
                            <div className='flex flex-col'>
                                <p className='text-2xl font-medium'>62H</p>
                                <p className='text-sm text-slate-500'>Time Dedicated</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard