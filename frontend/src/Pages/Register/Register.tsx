import { Link, useNavigate } from "react-router-dom";
import imgSrc from "../../assets/freelancer-working-laptop-her-house.png";
import { useState, useTransition } from "react";
import loadingAnimation from "../../assets/Animation - 1726660821372.webm"

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name,
      email,
      password,
      username,
    };

    try {
      const response = await fetch(
        "https://annoyed-mollee-sudo-rm-rf-83c225c7.koyeb.app/api/register/mentor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.status == 201) {
        navigate("/login");
      } else if (response.status == 200) {
        const errorData = await response.json();
      } else {
        const errorData = await response.json();
        setLoading(!loading);
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setLoading(!loading);
      setError(
        "An error occurred. Please check your connection and try again.",
        
      );
    }
  };

  return (
    <>
      <div className="main flex h-screen items-center justify-center gap-36">
        <div className="signIn flex w-96 flex-col text-balance pt-4">
          <h1 className="mb-11 text-4xl font-bold text-[#1f1f1f]">Start your mentoring journey!</h1>

          <div className="form">
            <form onSubmit={handleForm}>
              <div className="mb-3 flex flex-col">
                <label className="text-sm font-semibold text-[#1f1f1f]">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="my-2 w-96 rounded-md border-[1px] border-solid border-[#cdcdcd] py-2 pl-3 placeholder:text-[#cccccc]"
                />
              </div>

              <div className="mb-3 flex flex-col">
                <label className="text-sm font-semibold text-[#1f1f1f]">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="my-2 w-96 rounded-md border-[1px] border-solid border-[#cdcdcd] py-2 pl-3 placeholder:text-[#cccccc]"
                />
              </div>

              <div className="mb-3 flex flex-col">
                <label className="text-sm font-semibold text-[#1f1f1f]">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="my-2 w-96 rounded-md border-[1px] border-solid border-[#cdcdcd] py-2 pl-3 placeholder:text-[#cccccc]"
                />
              </div>
              <div className="mb-3 flex flex-col">
                <label className="text-sm font-semibold text-[#1f1f1f]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="my-2 w-96 rounded-md border-[1px] border-solid border-[#cdcdcd] py-2 pl-3 placeholder:text-[#cccccc]"
                />
              </div>

              <button
                className="mb-2 w-96 rounded-lg bg-black h-10  text-center text-white"
                type="submit"
              >
                {/* Register */}
                {loading? (<video src={loadingAnimation}
                autoPlay
                loop
                className="h-10 mx-auto "></video>): "Register"}
                
              </button>
              <p>
                Already a member?
                <Link to={"/login"}>
                  {" "}
                  <span className="text-lg text-blue-500 underline">Login</span>
                </Link>
              </p>
            </form>
          </div>

          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-[#f1f1f1]"></div>
            <span className="mx-2 text-[#cbcbcb]">Or</span>
            <div className="flex-grow border-t border-[#f1f1f1]"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="gAuth flex w-64 items-center gap-4 rounded-md border-2 border-solid border-[#1f1f1f] px-6 py-[10px]">
              <img
                className="h-5"
                src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
                alt=""
              />

              <p className="whitespace-nowrap text-base">
                Continue with<span className="font-bold"> Google</span>
              </p>
            </div>
          </div>
          <div className="">
            {error && <div className="error-message">{error}</div>}
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
