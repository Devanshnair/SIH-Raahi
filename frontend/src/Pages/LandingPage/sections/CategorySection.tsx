import CategoryComponent from "../../../components/CategoryComponent";
import softwareImgSrc from "../../../assets/advanced-computer-skills-abstract-concept-illustration.png"
import studyAbroad from "../../../assets/study-abroad-concept-illustration.png"
import careerGuide from "../../../assets/team-leader-teamwork-concept.png"
import jeeneet from "../../../assets/flat-university-concept-background.png" 
import marketing from "../../../assets/mobile-marketing-concept-illustration.png"
import mental from "../../../assets/mental-health-concept-illustration.png"



const CategorySection = () => {
  return (
    <>
      <div className="main text-slate-900 bg-slate-100 rounded-t-[10%] py-20 flex flex-col justify-center ">
        <div className="w-full flex flex-col justify-start pl-[7.5rem] pb-12">
          <div className="catcon ml-28 w-40 py-2 rounded-3xl font-semibold text-center border-slate-700 border-[1px] border-solid px-3  mt-6 mb-3 ">
            <h1 className="text-sm tracking-tight">TOP CATEGORY</h1>
          </div>
          <h2 className="text-4xl ml-28 mb-6 text-slate-900 font-bold">
            Category You Must Know
          </h2>
        </div>

        <div className="flex justify-center items-center w-full">
          <div
            style={{
              gridTemplateColumns: "320px 320px 320px ",
            }}
            className="container w-screen grid gap-11  justify-center"
          >
            <CategoryComponent
              imgSrc={softwareImgSrc}
              Category="Software Engineering"
              mentor="200"
            />
            <CategoryComponent
              Category="Study Abroad"
              imgSrc={studyAbroad}
              mentor="100"
            />
            <CategoryComponent
              Category="Career Guidance"
              imgSrc={careerGuide}
              mentor="70"
            />
            <CategoryComponent
              Category="JEE/NEET Guidance"
              imgSrc={jeeneet}
              mentor="110"
            />
            <CategoryComponent
              Category="Marketing"
              imgSrc={marketing}
              mentor="100"
            />
            <CategoryComponent
              Category="Mental Health"
              imgSrc={mental}
              mentor="100"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySection;
