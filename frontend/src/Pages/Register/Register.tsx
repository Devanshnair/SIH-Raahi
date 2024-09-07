import { Link, Navigate } from "react-router-dom";
import imgSrc from "../../assets/freelancer-working-laptop-her-house.png";
import { useState, useTransition } from "react";

const Register = () => {

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleForm = async (e:any)=>{
    e.preventDefault();

    const formData = {
      name , 
      email ,
      password,
      username
    }

     const response = await fetch(
       "https://live-merely-drum.ngrok-free.app/api/register/mentor/",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       }
     );

     


  }

  return (
    <>
      <div className="main h-screen gap-36 justify-center items-center flex">
        <div className="signIn w-96 flex flex-col  ">
          <h1 className="font-bold text-[#1f1f1f] text-4xl mb-7">Register</h1>

          <div className="form">
            <form onSubmit={handleForm}>
              <div className="flex flex-col mb-3">
                <label className="text-sm text-[#1f1f1f] font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2 "
                />
              </div>

              <div className="flex flex-col mb-3">
                <label className="text-sm text-[#1f1f1f] font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2 "
                />
              </div>

              <div className="flex flex-col mb-3">
                <label className="text-sm text-[#1f1f1f] font-semibold">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Username/Email"
                  className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2 "
                />
              </div>
              <div className="flex flex-col mb-3">
                <label className="text-sm text-[#1f1f1f] font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Username/Email"
                  className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2 "
                />
              </div>

              <button className="text-center w-96 bg-black text-white py-2 mb-2 rounded-lg" type="submit">
                <Link to={"/"}>Register</Link>
              </button>
              <p>
                Not a member? 
                <Link to={"/login"} > <span className='text-lg text-blue-500 underline'>Login</span></Link>
              </p>
            </form>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#f1f1f1]"></div>
            <span className="mx-2 text-[#cbcbcb]">Or</span>
            <div className="flex-grow border-t border-[#f1f1f1]"></div>
          </div>

          <div className=" flex flex-col items-center">
            <div className="gAuth flex w-64 py-[10px] gap-4 border-solid items-center border-2 border-[#1f1f1f] rounded-md px-6">
              <img
                className="h-5"
                src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                alt=""
              />

              <p className="text-base whitespace-nowrap">
                Continue with<span className="font-bold "> Google</span>
              </p>
            </div>
          </div>
        </div>

        <div className="imgDiv">
          <img className="w-96" src={imgSrc} alt="" />
        </div>
      </div>
    </>
  );
};

export default Register;
