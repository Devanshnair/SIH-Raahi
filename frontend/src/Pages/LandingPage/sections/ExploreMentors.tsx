import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowTrendingUp } from 'react-icons/hi2';

const MentorExplore: React.FC = () => {
  const [active, setActive] = useState<number>(0);

  const handleHoverStart = (index: number) => {
    setActive(index);
  };

  const handleHoverEnd = () => {
    setActive(0);
  };

  return (
    <div className='flex justify-evenly py-44'>
        <div className='flex flex-col gap-6'>
            <p className='text-[3.6rem] font-bold leading-tight text-slate-100'>Connect.<br /> Learn.<br /> Grow.</p>
            <p className='text-neutral-400 tracking-tight'>Start, switch or advance your career with <br />more than 10K+ mentors to help you!</p>
            <div className='flex gap-4 justify-center items-center'>
                <div className='flex justify-center items-center gap-1'>
                    <HiArrowTrendingUp className='h-12 w-12 text-teal-500'/>
                    <p className='text-3xl font-bold text-neutral-300 pr-4 border-r border-neutral-400'>97%</p>
                </div>
                <p className='text-neutral-400 tracking-tighter text-[0.93rem]'>People learning for professional development report <br /> career benefits, including outcomes like getting a promotion</p>
            </div>
        </div>
        <div className="flex gap-4 cursor-pointer">
        <motion.div
            className="flex h-96 rounded-lg overflow-hidden origin-center relative"
            onHoverStart={() => handleHoverStart(0)}
            onHoverEnd={handleHoverEnd}
            animate={{ width: active === 0 ? "18rem" : "5rem" }}
            transition={{ duration: 0.3 }}
        >
            {active == 0 && 
                <div className='bg-black text-white h-14 w-14 z-10 absolute left-0 top-6 pl-6 flex justify-start items-center text-2xl'>Writing</div>
            }
            <img src="../../../src/assets/explore2.png" alt="Image 1" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
            className="flex h-96 rounded-lg overflow-hidden origin-center relative"
            onHoverStart={() => handleHoverStart(1)}
            onHoverEnd={handleHoverEnd}
            animate={{ width: active === 1 ? "18rem" : "5rem" }}
            transition={{ duration: 0.3 }}
        >
            {active == 1 && 
                <div className='bg-black text-white h-20 w-20 z-10 absolute right-4 top-0 pl-5 flex justify-start items-center text-3xl font-[350] tracking-tight rotate-90 shadow-md'>Communication</div>
            }
            <img src="../../../src/assets/explore1.png" alt="Image 2" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
            className="flex 96 rounded-lg overflow-hidden origin-center relative"
            onHoverStart={() => handleHoverStart(2)}
            onHoverEnd={handleHoverEnd}
            animate={{ width: active === 2 ? "18rem" : "5rem" }}
            transition={{ duration: 0.3 }}
        >
            {active == 2 && 
                <div className='bg-neutral-50 h-16 w-16 z-10 absolute left-0 bottom-10 pl-7 flex justify-start items-center text-3xl -rotate-90 shadow-lg'>Software</div>
            }
            <img src="../../../src/assets/explore3.png" alt="Image 3" className="w-full h-full object-cover object-[78%]" />
        </motion.div>
        <motion.div
            className="flex h-96 rounded-lg overflow-hidden origin-center relative"
            onHoverStart={() => handleHoverStart(3)}
            onHoverEnd={handleHoverEnd}
            animate={{ width: active === 3 ? "18rem" : "5rem"}}
            transition={{ duration: 0.3 }}
        >
            {active == 3 && 
                <div className='bg-white text-black h-16 w-16 z-10 absolute top-6 left-0 pl-6 flex justify-start items-center text-3xl shadow-lg'>Business</div>
            }
            <img src="../../../src/assets/explore4.png" alt="Image 2" className="w-full h-full object-cover object-[40%]" />
        </motion.div>
        </div>
    </div>
  );
};

export default MentorExplore;
