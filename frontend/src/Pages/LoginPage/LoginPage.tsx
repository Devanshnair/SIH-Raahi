import { useState } from 'react';
import imgSrc from '../../assets/freelancer-working-laptop-her-house.png'
import { Link, useNavigate } from 'react-router-dom';
import loadingAnimation from "../../assets/Animation - 1726660821372.webm"
import { useLogin } from '../../context/LoginContext';
import { baseURL } from '../../App';




const LoginPage = () => {
   const { isLoggedIn, setIsLoggedIn } = useLogin();
  console.log(isLoggedIn);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const handleForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setIsLoggedIn(true);
    

    const formData = {
      password,
      username,
    };

    const setCookie = (name: any, value: any, days: any) => {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const response = await fetch(
      `${baseURL}/api/token/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    
      const data = await response.json();
      console.log(data.access);
      console.log(data.refresh);
      

      setCookie("accessToken", data.access, 7);
      setCookie("refreshToken", data.refresh, 90);
      navigate("/dashboard/home");

    
  };

  


  return (
    <>
      <div className="main h-screen gap-36 justify-center items-center flex">
        <div className="signIn w-96 flex flex-col  ">
          <h1 className="font-bold text-[#1f1f1f] text-4xl mb-7">Login</h1>

          <div className="form">
            <form onSubmit={handleForm}>
              <div className="flex flex-col mb-4">
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
              <div className="flex flex-col mb-4">
                <label className="text-sm text-[#1f1f1f] font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2 "
                />
              </div>

              <button
                type="submit"
                className="text-center w-96 bg-black text-white h-10 mb-5 rounded-lg"
              >
                {loading? (<video src={loadingAnimation}
                autoPlay
                loop
                className='h-10 mx-auto'
                ></video>): "Login"}
              </button>
              <p>
                Not a member? 
                <Link to={"/register"} > <span className='text-lg text-blue-500 underline'>Register</span></Link>
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

export default LoginPage;
