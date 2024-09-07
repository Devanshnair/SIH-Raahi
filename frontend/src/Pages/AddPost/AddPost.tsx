import { useState } from "react";
import imgSrc from "../../assets/3129492.jpg"


const AddPost = () => {

     const [title, setTitle] = useState("");
     const [username , setUsername] = useState("")
     const [video, setVideo] = useState(null);

     const handleSubmit = async (e:any) => {
       e.preventDefault();

       if (!title || !video) {
         alert("Please provide both a title and a video file.");
         return;
       }

       const formData = new FormData();
    //    formData.append("username", username);
       formData.append("title", title);
       formData.append("video", video);

       try {
         const response = await fetch(
           "https://live-merely-drum.ngrok-free.app/api/posts/",
           {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify(formData),
           }
         );

         if (response.ok) {
           alert("Video uploaded successfully!");
           setTitle("");
           setVideo(null);
         } else {
           alert("Failed to upload video. Please try again.");
         }
       } catch (error) {
         console.error("Error uploading video:", error);
         alert("An error occurred while uploading the video.");
       }
     };

  return (
    <>
      <div className="main grid grid-cols-[30vw_70vw]">
        <div className="bg-slate-700 h-screen flex justify-center items-center">
          <div className="img w-72 px-6  rounded-3xl overflow-hidden">
            <img src={imgSrc} alt="" />
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center items-center min-h-screen p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-lg text-[#1f1f1f] font-semibold "
              >
                Username
              </label>
              <input
                type="text"
                id="title"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2"
                placeholder="Enter Your Username"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-lg text-[#1f1f1f] font-semibold "
              >
                Video Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2"
                placeholder="Enter video title"
                required
              />
            </div>
            
            <div className="mb-6">
              <label
                htmlFor="video"
                className="block text-lg text-[#1f1f1f] font-semibold   "
              >
                Upload Video
              </label>
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                className="  border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2 "
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Upload Video
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
