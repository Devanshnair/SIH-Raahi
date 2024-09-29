import MentorCard from "../../components/MentorCard";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import ImgSrc from "../../assets/DummyImg.jpg"
import { baseURL } from "../../App";
import { useLoaderData } from "react-router-dom";

import CustomSelect from "../../components/custom-select/CustomSelect";
import Navbar from "../../components/Navbar";
import ChatbotButton from "../../components/ChatbotButton";

// const details = [
//   {
//     name: "Vaibhavi Sharma",
//     description: "PM at Amazon",
//     bio: " If Vaibhav you're looking to break into Product Management, I'd love to connect and guide you on this journey! I've been at Microsoft for 7+ yearsy at Microsoft as a Support Engineer, moved to Software Development and I am now a Product Lorem ipsum dolor sit.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Manager...",
//     profile_picture:
//       "https://www.preplaced.in/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fpreplaced-upload-prod%2Fo%2Fimage%252Fmentor-profile%252FAnarghya%2520Kinirec4B9R7jrAPQKGzx%3Falt%3Dmedia%26token%3D16d5e78b-3214-4766-94f7-6197bd1c588a&w=384&q=75",
//   },

//   {
//     name: "Devansh Nair",
//     description: "JEE AIR 60",
//     bio: "If Devsnah you're loongineer, moved to Software Development and I am now a Product Lorem ipsum dolor sit.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Manager...",
//     profile_picture:
//       "https://media.licdn.com/dms/image/v2/D4D03AQFYw_Y1t3i9YQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1679624812548?e=1730332800&v=beta&t=H967XTErEqS3a0nK_3AGeTBARtkmXtDhmXTU1Jh5pgQ",
//   },
//   {
//     name: "Vinayak Mohanty",
//     description: "VCT Finalist",
//     bio: "If vinayak you're looking to break into Product Management, I'd love to connect and guide you on this journey! I've been at Microsoft for 7+ years. I started dolor sit amet consectetur adipisicing elit. Manager...",
//     profile_picture:
//       "https://media.licdn.com/dms/image/v2/D4D03AQF8vzg9H4FAHQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714593139519?e=1730332800&v=beta&t=uceqivrIMNCObHtXh06E6uOhdYuhJGRawGAepHpWF3k",
//   },

//   {
//     name: "Vaibhavi Sharma",
//     description: "PM at Amazon",
//     bio: " If Vaibhav you're looking to break into Product Management, I'd love to connect and guide you on this journey! I've been at Microsoft for 7+ yearsy at Microsoft as a Support Engineer, moved to Software Development and I am now a Product Lorem ipsum dolor sit.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Manager...",
//     profile_picture:
//       "https://www.preplaced.in/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fpreplaced-upload-prod%2Fo%2Fimage%252Fmentor-profile%252FAnarghya%2520Kinirec4B9R7jrAPQKGzx%3Falt%3Dmedia%26token%3D16d5e78b-3214-4766-94f7-6197bd1c588a&w=384&q=75",
//   },
// ];

const MentorExPg = () => {

  
  const [details, setDetails] = useState([]);
  const data = useLoaderData();
   useEffect(() => {
     setDetails(data);
   }, [data]);

  // useEffect(() => {
  //   const request = async () => {
  //     const response = await fetch(
  //       `${baseURL}/api/mentors/`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "ngrok-skip-browser-warning": "true",
  //         },
  //       },
  //     );

  //     const data = await response.json();
  //     setDetails(data);
  //     console.log(data);
  //   };

  //   request();
  // }, []);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [roles, setRoles] = useState("");
  const [language, setLanguage] = useState("");
  const [minimumPrice, setMinimumPrice] = useState<number>(0);
  const [maximumPrice, setMaximumPrice] = useState<number>(10000);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let Url = `${baseURL}/api/mentors/?`;
    let flag = false;

    if (roles !== "") {
      Url += roles;
      flag = true;
    }

    // if (!language) {
    //   if (flag) {
    //     Url = `${Url}&`
    //     Url += Url + roles;

    //   }else{
    //     Url += Url + roles;
    //     flag = true;
    //   }
    // }

    if (maximumPrice <= 10000) {
      if (flag) {
        Url = `${Url}&`;
        Url = `${Url}max_price=${maximumPrice}`;
      } else {
        Url = `${Url}max_price=${maximumPrice}`;
        flag = true;
      }
    }

    if (minimumPrice >= 0) {
      if (flag) {
        Url = `${Url}&`;
        Url = `${Url}min_price=${minimumPrice}`;
      } else {
        Url = `${Url}min_price=${minimumPrice}`;
        flag = true;
      }
    }

    if (sortBy !== "") {
      if (flag) {
        Url = `${Url}&`;
        Url =
          Url +
          (sortBy == "Price: Low to High"
            ? "order_by=price"
            : "order_by=-price");
      } else {
        Url =
          Url +
          (sortBy == "Price: Low to High"
            ? "order_by=price"
            : "order_by=-price");
        flag = true;
      }
    }
     console.log(Url);
    const response = await fetch(Url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setDetails(data);
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-100">
        <div className="main sticky top-0 w-full bg-slate-100 pb-8">
          <div className="search mx-auto mt-4 flex max-w-3xl items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white pl-4 pr-2">
            <IoIosSearch className="text-2xl" />

            <form
              onSubmit={handleForm}
              className="flex items-center justify-center"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for any Skills , domain or name"
                className="h-11 w-[720px] pl-4 text-lg focus:outline-none"
              />

              <button type="submit">
                {/* <FaArrowCircleRight className="cursor-pointer text-4xl" /> */}
                {/* <ArrowRightCircle className="size-7 cursor-pointer" /> */}
              </button>
            </form>
          </div>
        </div>

        <div className="flex gap-20 px-4">
          <div className="sticky top-[5.85rem] flex h-[530px] flex-col gap-5 rounded-2xl bg-white pt-5 shadow-md shadow-slate-200 filter">
            <p className="text-center text-2xl font-bold text-slate-800">
              Filters
            </p>

            <form onSubmit={handleForm} className="grid gap-5 px-5">
              <div className="grid gap-0.5">
                <label className="px-px font-medium">Sort by</label>
                {/*<select
                  id="sort"
                  className="rounded-md border-[1px] border-solid border-gray-500 bg-white py-2 pl-2 focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="order_by=price">Price: Low to High</option>
                  <option value="order_by=-price">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select> */}
                <CustomSelect
                  options={[
                    "Price: Low to High",
                    "Price: High to Low",
                    "Rating",
                  ]}
                  onChange={(val) => setSortBy(val)}
                  value={sortBy}
                />
              </div>

              <div className="grid gap-0.5">
                <label className="px-px font-medium">Roles</label>
                {/* <select
                  id="sort"
                  className="rounded-md border-[1px] border-solid border-gray-500 bg-white py-2 pl-2 focus:outline-none"
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="categories=1">Software Developer</option>
                  <option value="categories=2">Civil Servent</option>
                  <option value="categories=3">Toppers</option>
                </select> */}
                <CustomSelect
                  options={["Software Developer", "Civil Servent", "Toppers"]}
                  onChange={(val) => setRoles(val)}
                  value={roles}
                />
              </div>

              <div className="grid gap-0.5">
                <label className="px-px font-medium">Language</label>
                <input
                  type="text"
                  placeholder="Hindi, English"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-md border-[1px] border-gray-300 py-2 pl-2 focus:outline-none"
                />
              </div>

              {/* <div className="grid">
                <label className="mr-3 text-xl font-medium">
                  Minimum Price:
                </label>
                <input
                  type="text"
                  value={minimumPrice}
                  onChange={(e) => setMinimumPrice(e.target.value)}
                  placeholder=" "
                  className="w-24 rounded-md border-[1px] border-solid border-gray-500 py-2 pl-2 focus:outline-none"
                />
              </div> */}

              <div>
                {/* <label className="mr-3 text-xl font-semibold">
                  Maximum Price:
                </label>
                <input
                  type="text"
                  placeholder=" "
                  value={maximumPrice}
                  onChange={(e) => setMaximumPrice(e.target.value)}
                  className="w-24 rounded-md border-[1px] border-solid border-gray-500 py-2 pl-2 focus:outline-none"
                /> */}

                <PriceRangePicker
                  min={minimumPrice}
                  max={maximumPrice}
                  setMinValue={setMinimumPrice}
                  setMaxValue={setMaximumPrice}
                  step={100}
                />
              </div>

              <button
                type="submit"
                className="mt-2 rounded-md bg-slate-800 px-3 py-2 font-medium leading-5 text-white shadow-md hover:bg-slate-900"
              >
                Filter
              </button>
            </form>
          </div>

          <div className="list grid gap-6">
            {details.map((ele, index) => {
              return (
                <MentorCard
                  key={index}
                  mentorId={ele.id}
                  name={ele.name}
                  desc={ele.description}
                  bio={ele.bio}
                  imgSrc={
                    ele.profile_picture
                      ? `${ele.profile_picture}`
                      : ImgSrc
                  }
                  price={ele.price}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ChatbotButton/>
    </>
  );
};

export default MentorExPg;

interface PriceRangePickerProps {
  min: number;
  max: number;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}

function PriceRangePicker({
  min: minValue,
  max: maxValue,
  step,
  setMaxValue,
  setMinValue,
}: PriceRangePickerProps) {
  const min = 0;
  const max = 10000;
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const minHandleRef = useRef<HTMLDivElement>(null);
  const maxHandleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPercent = (value: number) =>
    Math.round(((value - min) / (max - min)) * 100);

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }

    if (minHandleRef.current) {
      minHandleRef.current.style.left = `${minPercent}%`;
    }

    if (maxHandleRef.current) {
      maxHandleRef.current.style.left = `${maxPercent}%`;
    }
  }, [minValue, maxValue]);

  const handlePriceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    boundary: "min" | "max",
  ) => {
    const value = Math.min(Math.max(Number(e.target.value), min), max);
    if (boundary === "min") {
      setMinValue(Math.min(value, maxValue - step));
    } else {
      setMaxValue(Math.max(value, minValue + step));
    }
  };

  const handleMouseDown = (e: React.MouseEvent, handle: "min" | "max") => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left;
    const newPercent = Math.min(
      Math.max((newX / containerRect.width) * 100, 0),
      100,
    );
    const newValue =
      Math.round(((newPercent / 100) * (max - min)) / step) * step + min;

    if (isDragging === "min") {
      setMinValue(Math.min(newValue, maxValue - step));
    } else {
      setMaxValue(Math.max(newValue, minValue + step));
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(null);
    document.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[330px] rounded-lg bg-white">
      <h2 className="mb-4 px-px font-semibold text-gray-800">Price Range</h2>
      <div
        ref={containerRef}
        className="relative mx-2 mb-4 h-2 rounded-full bg-gray-200"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={rangeRef}
          className="absolute h-full rounded-full bg-slate-800"
        ></div>
        <div
          ref={minHandleRef}
          className="absolute -ml-3 -mt-2 flex h-6 w-6 cursor-grab items-center justify-center rounded-full border-2 border-slate-800 bg-white shadow active:cursor-grabbing"
          onMouseDown={(e) => handleMouseDown(e, "min")}
        >
          <div className="h-2 w-2 rounded-full bg-slate-800"></div>
        </div>
        <div
          ref={maxHandleRef}
          className="absolute -ml-3 -mt-2 flex h-6 w-6 cursor-grab items-center justify-center rounded-full border-2 border-slate-800 bg-white shadow active:cursor-grabbing"
          onMouseDown={(e) => handleMouseDown(e, "max")}
        >
          <div className="h-2 w-2 rounded-full bg-slate-800"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative mt-1 rounded-md shadow-sm">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            ₹
          </span>
          <input
            type="number"
            value={minValue}
            onChange={(e) => handlePriceInputChange(e, "min")}
            className="block w-full rounded-md border-gray-300 py-2 pl-7 pr-3 focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
            placeholder="Min price"
          />
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative mt-1 rounded-md shadow-sm">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            ₹
          </span>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => handlePriceInputChange(e, "max")}
            className="block w-full rounded-md border-gray-300 py-2 pl-7 pr-3 focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
            placeholder="Max price"
          />
        </div>
      </div>
    </div>
  );
}


export  const MentorDetails = async () => {
  const response = await fetch(`${baseURL}/api/mentors/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  return response.json();
};