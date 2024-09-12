import React from 'react'
import { BsCalendar4Week } from 'react-icons/bs'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import { IoEyeOutline, IoStarOutline } from 'react-icons/io5'
import { LiaCertificateSolid } from 'react-icons/lia'
import { LuUser } from 'react-icons/lu'
import { RiComputerLine } from 'react-icons/ri'
import { CartesianGrid, Legend, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import StatCards from '../../../components/StatCards'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { GoArrowUpRight } from 'react-icons/go'
import Overview from './sections/Overview'
import Activity from './sections/Activity'
import Domain from './sections/Domain'
import RecentlyBooked from './sections/RecentlyBooked'

const Dashboard = () => {
  return (
    <div className='grid grid-rows-[1fr,0.85fr,1fr] gap-4 justify-center items-center bg-slate-50 px-10 py-8 m-4 shadow rounded-lg'>
        <div className='grid grid-cols-[3fr,2fr] gap-10 w-full '>
            <Overview />
            <Activity />
        </div>
        <div className='grid grid-cols-[1.78fr,3fr] gap-4 w-full h-full'>
            <div className='h-full'>
            <Domain />
            </div>
            <div className='h-full grid grid-cols-3 gap-3 justify-center items-center'>
              <StatCards title="Total Earnings" value="₹44,000" pillText="2.75%" trend="up" period="From Jan 1st - Sept 31st" />
              <StatCards title="Average Bookings per month" value="7" pillText="1.01%" trend="down" period="From Jan 1st - Sept 31st" />
              <StatCards title="Current month earnings" value="₹3700" pillText="1.25%" trend="up" period="Sept 2024" />
            </div>
        </div>
        <RecentlyBooked />
    </div>
  )
}

export default Dashboard