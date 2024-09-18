import MentorCard from "../../components/MentorCard";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaArrowCircleRight } from "react-icons/fa";

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

  useEffect(() => {
    const request = async () => {
      const response = await fetch(
        "https://annoyed-mollee-sudo-rm-rf-83c225c7.koyeb.app/api/mentors/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      const data = await response.json();
      setDetails(data);
      console.log(data);
    };

    request();
  }, []);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [roles, setRoles] = useState("");
  const [language, setLanguage] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");

  const handleForm = async (e: any) => {
    e.preventDefault();

    let Url =
      "https://annoyed-mollee-sudo-rm-rf-83c225c7.koyeb.app/api/mentors/?";
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

    if (maximumPrice !== "") {
      if (flag) {
        Url = `${Url}&`;
        Url = `${Url}max_price=${maximumPrice}`;
      } else {
        Url = `${Url}max_price=${maximumPrice}`;
        flag = true;
      }
    }

    if (minimumPrice !== "") {
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
        Url = Url + sortBy;
      } else {
        Url = Url + sortBy;
        flag = true;
      }
    }

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
      <div className="flex w-screen flex-col items-center justify-center gap-4 bg-slate-100">
        <div className="main">
          <div className="search mt-4 flex items-center justify-center overflow-hidden rounded-full border-[1px] border-solid border-gray-500 bg-white pl-4">
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
                className="h-11 w-[40vw] pl-2 text-lg focus:outline-none"
              />

              <button type="submit">
                <FaArrowCircleRight className="cursor-pointer text-4xl" />
              </button>
            </form>
          </div>
        </div>

        <div className="container grid grid-cols-[2fr_7fr] gap-20 px-9">
          <div className="sticky top-0 mt-5 flex h-[430px] flex-col items-center gap-5 rounded-3xl bg-[#fefefe] pt-5 filter">
            <p className="text-center text-3xl font-bold text-[#222222]">
              Filters
            </p>

            <form
              onSubmit={handleForm}
              className="flex flex-col items-center justify-center gap-5"
            >
              <div>
                <label className="mr-3 text-xl font-semibold">Sort By</label>
                <select
                  id="sort"
                  className="rounded-md border-[1px] border-solid border-gray-500 bg-white py-2 pl-2 focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="order_by=price">Price: Low to High</option>
                  <option value="order_by=-price">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div>
                <label className="mr-3 text-xl font-semibold">Roles:</label>
                <select
                  id="sort"
                  className="rounded-md border-[1px] border-solid border-gray-500 bg-white py-2 pl-2 focus:outline-none"
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="categories=1">Software Developer</option>
                  <option value="categories=2">Civil Servent</option>
                  <option value="categories=3">Toppers</option>
                </select>
              </div>

              <div>
                <label className="mr-3 text-xl font-semibold">Language:</label>
                <input
                  type="text"
                  placeholder="Hindi , English "
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="max-w-[120px] rounded-md border-[1px] border-solid border-gray-500 py-2 pl-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="mr-3 text-xl font-semibold">
                  Minimum Price:
                </label>
                <input
                  type="text"
                  value={minimumPrice}
                  onChange={(e) => setMinimumPrice(e.target.value)}
                  placeholder=" "
                  className="w-24 rounded-md border-[1px] border-solid border-gray-500 py-2 pl-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="mr-3 text-xl font-semibold">
                  Maximum Price:
                </label>
                <input
                  type="text"
                  placeholder=" "
                  value={maximumPrice}
                  onChange={(e) => setMaximumPrice(e.target.value)}
                  className="w-24 rounded-md border-[1px] border-solid border-gray-500 py-2 pl-2 focus:outline-none"
                />
              </div>

              <button type="submit">
                <FaArrowCircleRight className="cursor-pointer text-4xl" />
              </button>
            </form>
          </div>

          <div className="list grid gap-6 pt-5">
            {details.map((ele, index) => {
              return (
                <MentorCard
                  key={index}
                  mentorId={ele.id}
                  name={ele.name}
                  desc={ele.description}
                  bio={ele.bio}
                  imgSrc={ele.profile_picture}
                  price={ele.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorExPg;
