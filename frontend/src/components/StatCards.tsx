import React from 'react'
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

const StatCards = ({title, value, pillText, trend, period}: 
    {title: string; value: string; pillText?: string; trend?: "up" | "down"; period: string;}) => {
    return (
      <div className=" flex flex-col justify-between p-4 rounded border border-slate-300 h-[10rem] w-full cursor-pointer">
        <div className="flex flex-col items-start justify-between">
          <div className='flex justify-between items-start w-full'>
            <h3 className="text-slate-500 text-sm h-[2.4rem]">{title}</h3>
            <span
                className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
                trend === "up"
                    ? "bg-teal-100 text-teal-700"
                    : ""}
                ${trend === "down"
                    ? " bg-red-100 text-red-700  "
                    : ""}
                `}
            >
                {trend === "up" ? <FiTrendingUp /> : trend === "down" ? <FiTrendingDown /> : ""} {pillText}
            </span>
          </div>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        <p className="text-xs text-slate-500">{period}</p>
      </div>
    );
  };

export default StatCards