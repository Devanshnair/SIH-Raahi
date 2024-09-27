import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { Link } from "react-router-dom";

const MentorCard = ({ mentorId, name, desc, bio, imgSrc, price }) => {
  return (
    <>
      <div className="card flex items-center justify-between rounded-xl bg-white px-6 pb-3 shadow-md shadow-slate-200">
        <div className="img flex w-[200px] flex-col items-center justify-center gap-3">
          <div className="mb-14 flex items-center justify-center overflow-hidden rounded-xl object-cover">
            <img src={imgSrc} alt="" className="rounded-xl" />
          </div>
        </div>

        <div className="content h-[350px] w-[530px] pt-10">
          <div className="text h-[240px]">
            <h1 className="text-3xl font-semibold">{name}</h1>
            <h2 className="text-lg font-medium">{desc}</h2>
            <div className="flex items-center">
              <IoIosStar className="text-[#f4b941]" />
              <IoIosStar className="text-[#f4b941]" />
              <IoIosStar className="text-[#f4b941]" />
              <IoIosStar className="text-[#f4b941]" />
              <IoIosStarHalf className="text-[#f4b941]" />
              &nbsp;
              <p>{`4.5 (6 review)`}</p>
            </div>

            <p className="mt-2 text-[#606060]">{bio}</p>
          </div>

          <div className="btn flex items-center justify-evenly">
            <div className="leading-3">
              <p className="text-sm font-semibold text-[#7e8490]">
                Starting from
              </p>
              <p className="text-xl font-semibold">
                ₹{price}
                <span className="text-xl font-semibold">/month</span>
              </p>
            </div>
            <button className="h-10 w-40 rounded-md bg-slate-800 text-lg font-medium text-white hover:bg-slate-900">
              <Link to={`/mentors/book/${mentorId}`}>Book Now</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorCard;
