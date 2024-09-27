import { useState } from "react";


const EditProfile = () => {
    const [description, setDescription] = useState("");
    const [bio , setBio] = useState("");
    const [price , setPrice] = useState("");
    const [picture, setPicture] = useState(null);

    const handleSubmit = async (e: any) => {
      e.preventDefault();

      if (!description || !picture) {
        alert("Please provide both a description and a image file.");
        return;
      }

      const formData = new FormData();
     
      formData.append("description", description);
      formData.append("bio", bio);
      formData.append("price", price);
      formData.append("picture", picture);
     

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
          alert("picture uploaded successfully!");
          setDescription("");
          setPicture(null);
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
    <div className="min-h-[calc(100vh-1rem)] bg-slate-50 pb-4 m-4 shadow rounded-lg">
      <div className="border-b p-6 px-8 flex flex-col gap-4">
        <h3 className="pl-1 text-3xl font-semibold text-slate-800">
          Profile
        </h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="p-2 px-4 border border-black rounded-3xl">Profile</button>
            <button className="p-2 px-4 border border-black rounded-3xl">Profile</button>
          </div>
          <button className="bg-slate-900 text-slate-50 p-2 px-6 rounded-3xl tracking-wider font-medium">Save</button>
        </div>
      </div>
      <div className="main grid grid-cols-[1fr,3fr] justify-center items-center px-10 py-10 ">
          <form onSubmit={handleSubmit} className="">
            <div className="mb-3">
              <label
                htmlFor="title"
                className="block text-lg text-[#1f1f1f] font-semibold "
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2"
                placeholder="Title"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="title"
                className="block text-lg text-[#1f1f1f] font-semibold "
              >
                Bio
              </label>
           
              <textarea
                
                id="title"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2"
                placeholder="Describe Yourself"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="title"
                className="block text-lg text-[#1f1f1f] font-semibold "
              >
                Price of Session
              </label>
              <input
                type="text"
                id="title"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2"
                placeholder="Price of Session"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="video"
                className="block text-lg text-[#1f1f1f] font-semibold   "
              >
                Upload Profile Picture
              </label>
              <input
                type="file"
                id="picture"
                accept="picture/*"
                onChange={(e) => setPicture(e.target.files[0])}
                className="  border-[#cdcdcd] rounded-md placeholder:text-[#cccccc] pl-3 py-2 border-solid w-96 border-[1px] my-2 "
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Details
              </button>
            </div>
          </form>
      </div>
    </div>
    </>
  );
};

export default EditProfile;
