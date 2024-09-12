import React from 'react'
import { RiDoubleQuotesL } from 'react-icons/ri'

const MainSection = () => {
  return (
    <div className='pt-2 flex flex-col px-36 justify-center items-center rounded-b-[10%] bg-slate-100'>
        <div className='flex flex-col justify-center items-center p-2'>
            <h2 className='text-[4.65rem] font-bold'>Meet Professional </h2>
            <span className='text-[4.65rem] leading-none font-bold'>Mentors</span>
        </div>
        <div className='flex relative'>
            <div className='flex flex-col gap-6'>
                <RiDoubleQuotesL className='h-10 w-10'/>
                <p className='tracking-tight font-sans'>Now you can learn anywhere, <br /> anytime, even if you have no <br /> internet access</p>
                <div className='flex flex-col gap-1'>
                    <span className='text-2xl font-bold font font-serif'>10K+</span>
                    <span>Mentors</span>
                </div>
            </div>
            <div className='h-[28rem] w-[50rem] relative'>
                <div className='relative overflow-hidden h-full w-full'>
                    <div className='mt-24 h-[40rem] w-[50rem] rounded-t-full bg-[#edafb8] bg-[559cad] absolute' />
                </div>
                <div className='h-[38rem] w-[49rem] flex justify-center items-center -translate-y-40 translate-x-7 absolute top-0'>
                    <img src='../../../src/assets/LandingPageBanner.png' alt='Banner' className='h-[100%] object-cover relative' />
                </div>
            </div>
            <div className='w-52'>
                <p className='text-right absolute -right-4 bottom-32 tracking-tight'>Search amazing individuals around<br /> the globe, find a mentor,<br /> expand your network, and learn <br />from incredible people!</p>
            </div>
        </div>
    </div>
  )
}

export default MainSection