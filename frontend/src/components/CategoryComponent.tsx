import { IoPersonSharp } from "react-icons/io5";

const CategoryComponent = ({ imgSrc , Category , mentor }) => {
  return (
    <>
      <div className="card rounded-3xl text-slate-800  pt-5 flex flex-col pl-5 w-80 h-[270px]  border-2 border-slate-700 border-solid">
        <div className="w-[17.1rem] h-40 flex items-center justify-center rounded-3xl border-2 border-solid border-slate-700">
          <img src={imgSrc} className="h-40" alt="" />
        </div>

        <p className="text-lg font-semibold mt-2 ml-2">{Category}</p>

        <div className="flex items-center mt-1 ml-1">
          <IoPersonSharp className="ml-1 text-xl" />
          <p className="text-2xl font-bold ml-2">
            {mentor}
            <span className="text-xl font-semibold">
              +<span className="text-2xl">Mentors</span>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CategoryComponent;
