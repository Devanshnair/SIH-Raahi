import React from 'react'
import { BsCalendar4Week } from 'react-icons/bs'
import { IoEyeOutline, IoStarOutline } from 'react-icons/io5'
import { LiaCertificateSolid } from 'react-icons/lia'
import { jwtDecode } from "jwt-decode";


const Overview = () => {

    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    const decoded = jwtDecode(accessToken);

    console.log(decoded);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="pl-1 text-xl">Overview</h2>
      <div className="shado grid h-fit w-fit grid-cols-[1fr,2.7fr] items-center justify-center rounded-lg border border-slate-300 px-10 py-6">
        <div className="flex flex-col">
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <img
              src="../../../src/assets/explore5.png"
              alt="userimage"
              className="h-[100%] object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg">{decoded.name}</p>
            <p className="text-sm text-slate-500">Mentor &#9679; Software</p>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="flex items-center justify-start gap-4 border-b-2 border-r-2 border-slate-300 p-6">
            <div className="flex items-center justify-center rounded-full bg-slate-800 p-3">
              <IoEyeOutline className="h-6 w-6 text-slate-50" />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-medium">34</p>
              <p className="text-sm text-slate-500">Views this month</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 border-b-2 border-slate-300 pl-6">
            <div className="flex items-center justify-center rounded-full bg-slate-800 p-3">
              <LiaCertificateSolid className="h-7 w-7 text-slate-50" />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-medium">112</p>
              <p className="text-sm text-slate-500">Total sessions completed</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 border-r-2 border-slate-300 pl-6">
            <div className="flex items-center justify-center rounded-full bg-slate-800 p-3">
              <IoStarOutline className="h-6 w-6 text-slate-50" />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-medium">4.7</p>
              <p className="text-sm text-slate-500">Average Rating</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 pl-6">
            <div className="flex items-center justify-center rounded-full bg-slate-800 p-3">
              <BsCalendar4Week className="h-6 w-6 text-slate-50" />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-medium">08</p>
              <p className="text-sm text-slate-500">Upcoming meetings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview