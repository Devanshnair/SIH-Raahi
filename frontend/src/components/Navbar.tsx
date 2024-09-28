import React from 'react'
import { BiRightArrow } from 'react-icons/bi'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useLogin } from '../context/LoginContext'
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = () => {
  let {isLoggedIn } = useLogin();
  console.log(isLoggedIn);

  const ChangeLogin = ()=>{
    isLoggedIn= !isLoggedIn
    console.log(isLoggedIn);
    

  }
  
  
  return (
    
    <div className="flex items-center justify-between bg-slate-100 px-52 pt-3">
      {/* <button onClick={()=>ChangeLogin()}>hi</button> */}
      <div className="h-[4.5rem] cursor-pointer p-3">
        <img
          src="../../src/assets/Logo1.png"
          alt="Logo"
          className="h-[100%] object-cover"
        />
      </div>
      <div>
        <ul className="flex items-center justify-center gap-10">
          <li className="Homenav relative cursor-pointer text-lg tracking-wide">
            Home
          </li>
          <li className="Explorenav relative cursor-pointer text-lg tracking-wide">
            <Link to={"/mentors/explore"}>Explore</Link>
          </li>
          <li className="Insightsnav relative cursor-pointer text-lg tracking-wide">
            <Link to={"/mentors/reels"}>Insights</Link>
          </li>
          <li className="Insightsnav relative cursor-pointer text-lg tracking-wide">
            <Link to={"/forum"}>Forum</Link>
          </li>
        </ul>
      </div>

      {isLoggedIn ? (
        <Link to={"/dashboard"}>
          <IoPersonCircleSharp className="cursor-pointer text-[3rem] text-slate-300" />
        </Link>
      ) : (
        <Link to={"/register"}>
          <button className="Loginnav relative flex items-center justify-center gap-2 overflow-hidden rounded-full border-[1.5px] border-slate-900 px-4 py-[5px] font-medium shadow-md">
            <p className="z-20">Sign Up</p>
            <HiOutlineArrowNarrowRight className="iconarrowright z-20 h-[1.4rem] w-[1.4rem]" />
          </button>
        </Link>
      )}
    </div>
  );
}

export default Navbar