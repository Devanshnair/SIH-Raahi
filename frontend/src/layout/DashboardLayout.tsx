import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const DashboardLayout = () => {
  return (
    <>
    <div className={`rounded-md grid grid-cols-[240px,1fr] bg-slate-100 dark:bg-neutral-800 border border-neutral-200 dark:text-black !overflow-hidden`}>
      <div className='my-4'>
        <Sidebar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>       
    </>
  )
}

export default DashboardLayout
