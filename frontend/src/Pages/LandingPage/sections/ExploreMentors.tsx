import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowTrendingUp } from "react-icons/hi2";

const MentorExplore: React.FC = () => {
  const [active, setActive] = useState<number>(0);

  const handleHoverStart = (index: number) => {
    setActive(index);
  };

  const handleHoverEnd = () => {
    setActive(0);
  };

  return (
    <div className="flex justify-between px-28 py-44">
      <div className="flex flex-col gap-6">
        <p className="text-[3.6rem] font-bold leading-tight text-slate-100">
          Connect.
          <br /> Learn.
          <br /> Grow.
        </p>
        <p className="tracking-tight text-neutral-400">
          Start, switch or advance your career with <br />
          more than 10K+ mentors to help you!
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-1">
            <HiArrowTrendingUp className="h-12 w-12 text-teal-500" />
            <p className="border-r border-neutral-400 pr-4 text-3xl font-bold text-neutral-300">
              97%
            </p>
          </div>
          <p className="text-[0.93rem] tracking-tighter text-neutral-400">
            People learning for professional development report <br /> career
            benefits, including outcomes like getting a promotion
          </p>
        </div>
      </div>
      <div className="flex w-[34rem] cursor-pointer gap-4">
        <motion.div
          className="relative flex h-96 origin-center overflow-hidden rounded-lg"
          onHoverStart={() => handleHoverStart(0)}
          onHoverEnd={handleHoverEnd}
          animate={{ width: active === 0 ? "18rem" : "5rem" }}
          transition={{ duration: 0.3 }}
        >
          {active == 0 && (
            <motion.div
              initial={{
                x: "-100%",
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              className="absolute left-0 top-6 z-10 flex h-14 w-14 items-center justify-start bg-black pl-6 text-2xl text-white"
            >
              Writing
            </motion.div>
          )}
          <img
            src="../../../src/assets/explore2.png"
            alt="Image 1"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div
          className="relative flex h-96 origin-center overflow-hidden rounded-lg"
          onHoverStart={() => handleHoverStart(1)}
          onHoverEnd={handleHoverEnd}
          animate={{ width: active === 1 ? "18rem" : "5rem" }}
          transition={{ duration: 0.3 }}
        >
          {active == 1 && (
            <motion.div
              initial={{
                y: "-100%",
                rotate: 90,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              className="absolute right-4 top-0 z-10 flex h-20 w-20 items-center justify-start bg-black pl-5 text-3xl font-[350] tracking-tight text-white shadow-md"
            >
              Communication
            </motion.div>
          )}
          <img
            src="../../../src/assets/explore1.png"
            alt="Image 2"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div
          className="96 relative flex origin-center overflow-hidden rounded-lg"
          onHoverStart={() => handleHoverStart(2)}
          onHoverEnd={handleHoverEnd}
          animate={{ width: active === 2 ? "18rem" : "5rem" }}
          transition={{ duration: 0.3 }}
        >
          {active == 2 && (
            <motion.div
              initial={{
                x: "-100%",
                rotate: -90,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              className="absolute bottom-10 left-0 z-10 flex h-16 w-16 items-center justify-start bg-neutral-50 pl-7 text-3xl shadow-lg"
            >
              Software
            </motion.div>
          )}
          <img
            src="../../../src/assets/explore3.png"
            alt="Image 3"
            className="h-full w-full object-cover object-[78%]"
          />
        </motion.div>
        <motion.div
          className="relative flex h-96 origin-center overflow-hidden rounded-lg"
          onHoverStart={() => handleHoverStart(3)}
          onHoverEnd={handleHoverEnd}
          animate={{ width: active === 3 ? "18rem" : "5rem" }}
          transition={{ duration: 0.3 }}
        >
          {active == 3 && (
            <motion.div
              initial={{
                y: "-100%",
                rotate: 90,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              className="absolute left-0 top-6 z-10 flex h-16 w-16 items-center justify-start bg-white pl-6 text-3xl text-black shadow-lg"
            >
              Business
            </motion.div>
          )}
          <img
            src="../../../src/assets/explore4.png"
            alt="Image 2"
            className="h-full w-full object-cover object-[45%]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MentorExplore;
