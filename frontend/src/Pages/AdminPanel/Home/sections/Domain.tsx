import React from 'react'
import { RiComputerLine } from 'react-icons/ri';
import {Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer} from 'recharts'

const domaindata = [
    {
        expertise: 'Python',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        expertise: 'AIML',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        expertise: 'Resume Review',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        expertise: 'Crack interviews',
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        expertise: 'Javascript',
        A: 85,
        B: 90,
        fullMark: 150,
    },
    ];

const Domain = () => {
  return (
    <div className='flex flex-col gap-4 border border-slate-300 rounded p-6 h-full'>
        <div className={`flex items-center justify-start gap-2 w-full rounded px-2 cursor-pointer`}>
            <RiComputerLine className={`h-5 w-5`} />
            <h2 className='text-lg'>Domain</h2>
        </div>
        <div className='w-full h-full'>
            <ResponsiveContainer width="100%" >
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={domaindata}>
                <PolarGrid />
                <PolarAngleAxis dataKey="expertise" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="2021-2024" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="before 2021" dataKey="A" stroke="#64748b " fill="#cbd5e1" fillOpacity={0.7} />
                <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default Domain