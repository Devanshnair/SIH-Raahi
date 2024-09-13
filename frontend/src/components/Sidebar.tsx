import React, { useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

type navOptions = "Dashboard" | "Calendar" | "Testimonials";

const Sidebar = () => {
  const [selected, setselected] = useState<navOptions>("Dashboard"); //url path se state set karunga badme
  const param = useLocation();
  console.log(param);
  return (
    <>
      {/* useless div below*/}
      <div
        className={`sticky top-20 z-50 ml-[228px] ${selected == "Dashboard" ? "block" : "hidden"}`}
      >
        <p className="absolute w-[65ch] rounded-lg bg-white p-3 shadow-[0px_0px_2px_rgba(0,0,0,0.15)]">
          <strong>For Devansh:</strong> DashBoard is everything here isko home
          karna hai idhar ke components nikalke availabilty mai daal diyo,{" "}
          <br /> <strong>NOT-IMPORTANT:</strong> tune yaha pe div's pe onClick
          lagaya tha logically links ke hona chahiye na?!
          <span className="sr-only">
            yaha matlab ye iska parent div nai iska arrow jisko point karra hai
            woh
          </span>
        </p>
        <div className="absolute -left-[22px] top-6 -rotate-90 border-[.7rem] border-transparent border-b-white drop-shadow-[0px_-1px_1px_rgba(0,0,0,0.08)]"></div>
      </div>
      <div className="sticky top-4 h-[calc(100vh-32px)] overflow-y-auto px-4">
        <div className="mb-4 mt-2 border-b border-stone-300 pb-4">
          <Link to={"/Dashboard/edit-profile"}>
            <button className="relative flex w-full items-center gap-2 rounded p-0.5 transition-colors hover:bg-slate-200">
              <img
                src="https://api.dicebear.com/9.x/notionists/svg"
                alt="avatar"
                className="size-8 shrink-0 rounded bg-blue-400 shadow"
              />
              <div className="text-start">
                <span className="block text-sm font-bold">Raunita</span>
                <span className="block text-xs text-slate-500">
                  raunita313@gmail.com
                </span>
              </div>
            </button>
          </Link>
        </div>
        <div className="relative flex flex-col gap-2">
          <Link
            to={"/Dashboard"}
            className={`flex w-full cursor-pointer items-center justify-start gap-4 rounded-md px-4 py-2 transition-[box-shadow,_background-color,_color] ${
              selected == "Dashboard"
                ? "bg-white font-medium text-neutral-950 ring-1 ring-slate-300/20"
                : "bg-transparent text-slate-700 shadow-none hover:bg-slate-200"
            }`}
            onClick={() => setselected("Dashboard")}
          >
            <span
              className={`flex h-[1.4rem] w-[1.4rem] items-center justify-center rounded-sm border-b-[2.3px] border-l-[2.3px] ${selected == "Dashboard" ? "border-blue-500" : "border-slate-600"}`}
            >
              <TbBrandGoogleAnalytics
                className={`m-[1px] h-[1.35rem] w-[1.35rem] ${selected == "Dashboard" ? "text-blue-500" : ""}`}
              />
            </span>
            <span>Home</span>
          </Link>

          <Link
            to={"/user/my-calendar"}
            className={`flex w-full cursor-pointer items-center justify-start gap-4 rounded-md px-4 py-2 transition-[box-shadow,_background-color,_color] ${
              selected == "Calendar"
                ? "bg-white font-medium text-neutral-950 ring-1 ring-slate-300/20"
                : "bg-transparent text-slate-700 shadow-none hover:bg-slate-200"
            }`}
            onClick={() => setselected("Calendar")}
          >
            <IoCalendarClearOutline
              className={`m-[1px] h-[1.35rem] w-[1.35rem] ${selected == "Calendar" ? "text-blue-500" : ""}`}
            />
            <span>Calendar</span>
          </Link>
          <Link
            to={"/DashBoard/testimonials"}
            className={`flex w-full cursor-pointer items-center justify-start gap-4 rounded-md px-4 py-2 transition-[box-shadow,_background-color,_color] ${
              selected == "Testimonials"
                ? "bg-white font-medium text-neutral-950 ring-1 ring-slate-300/20"
                : "bg-transparent text-slate-700 shadow-none hover:bg-slate-200"
            }`}
            onClick={() => setselected("Testimonials")}
          >
            <IoCalendarClearOutline
              className={`m-[1px] h-[1.35rem] w-[1.35rem] ${selected == "Testimonials" ? "text-blue-500" : ""}`}
            />
            <span>Testimonials</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
