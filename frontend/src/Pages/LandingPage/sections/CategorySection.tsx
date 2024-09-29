import studyAbroad from "../../../assets/study-abroad-concept-illustration.png";
import careerGuide from "../../../assets/team-leader-teamwork-concept.png";
import jeeneet from "../../../assets/flat-university-concept-background.png";
import marketing from "../../../assets/mobile-marketing-concept-illustration.png";
import mental from "../../../assets/mental-health-concept-illustration.png";
import { CategoryCard } from "../../../components/CategoryComponent";

const CategorySection = () => {
  return (
    <>
      <div className="main flex flex-col justify-center rounded-t-[10%] bg-slate-100 py-20 text-slate-900">
        <div className="flex w-full flex-col justify-start pb-12 pl-[9.8rem]">
          <h2 className="mb-2 ml-24 text-4xl font-bold text-slate-900">
            Top Categories
          </h2>
        </div>

        <div className="flex w-full items-center justify-center">
          <div
            style={{
              gridTemplateColumns: "320px 320px 320px ",
            }}
            className="container grid w-screen justify-center gap-9 "
          >
            {[
              {
                title: "Software Engineering",
                mentors: 200,
                icon: careerGuide,
                color: "#BFDBFE", // bg-blue-100
              },
              {
                title: "Study Abroad",
                mentors: 100,
                icon: studyAbroad,
                color: "#BBF7D0", // bg-green-100
              },
              {
                title: "Career Guidance",
                mentors: 70,
                icon: careerGuide,
                color: "#FEF9C3", // bg-yellow-100
              },
              {
                title: "JEE/NEET Guidance",
                mentors: 110,
                icon: jeeneet,
                color: "#E9D5FF", // bg-purple-100
              },
              {
                title: "Marketing",
                mentors: 100,
                icon: marketing,
                color: "#FBCFE8", // bg-pink-100
              },
              {
                title: "Mental Health",
                mentors: 100,
                icon: mental,
                color: "#C7D2FE", // bg-indigo-100
              },
            ].map((category) => (
              <CategoryCard
                title={category.title}
                mentors={category.mentors}
                icon={category.icon}
                color={category.color}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
