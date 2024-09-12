import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { IoCalendarClearOutline, IoCalendarOutline } from 'react-icons/io5'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const [selected, setselected] = useState({
    dashboard: true,
    calendar: false,
  })

  return (
    <div className='overflow-y-scroll sticky h-[calc(100vh-32px)] pl-4'>
      <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
        <Link to={"/admin/editprofile"}>
          <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
            <img
              src="https://api.dicebear.com/9.x/notionists/svg"
              alt="avatar"
              className="size-8 rounded shrink-0 bg-blue-400 shadow"
            />
            <div className="text-start">
              <span className="text-sm font-bold block">Raunita</span>
              <span className="text-xs block text-slate-500">raunita313@gmail.com</span>
            </div>
          </button>
        </Link>
      </div>
      <div className='flex flex-col gap-2'>
        <Link to={"/admin"}>
          <div className={`flex items-center justify-start gap-4 w-full rounded px-4 py-2 cursor-pointer transition-[box-shadow,_background-color,_color] 
          ${selected.dashboard
                ? "bg-slate-50 text-neutral-950 shadow font-medium ]"
                : "hover:bg-slate-200 bg-transparent text-slate-700 shadow-none"
            }`}
            onClick={()=>setselected({dashboard:false, calendar:true})}
          >
            <span className={`border-b-[2.3px] border-l-[2.3px] h-[1.4rem] w-[1.4rem] rounded-sm flex justify-center items-center ${selected.dashboard ? "border-blue-500" : " border-slate-600"}`}>
              <TbBrandGoogleAnalytics  className={`h-[1.35rem] w-[1.35rem] m-[1px] ${selected.dashboard ? "text-blue-500" : ""}`} />
            </span>
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to={"/user/my-calendar"}>
          <div className={`flex items-center justify-start gap-4 w-full rounded px-4 py-2 cursor-pointer transition-[box-shadow,_background-color,_color] 
          ${selected.calendar
                ? "bg-slate-50 text-neutral-950 shadow font-medium text-[1.1rem]"
                : "hover:bg-slate-200 bg-transparent text-slate-700 shadow-none"
            }`}
            onClick={()=>setselected({dashboard:false, calendar:true})}
          >
            <IoCalendarClearOutline  className={`h-[1.35rem] w-[1.35rem] m-[1px] ${selected.calendar ? "text-blue-500" : ""}`} />
            <p>Calendar</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar