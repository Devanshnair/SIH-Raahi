import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Save,
  Camera,
} from "lucide-react";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "Vinayak Mohanty",
    email: "vinayak97696@gmail.com",
    phone: "+91 7278335447",
    location: "Mumbai, India",
    profession: "Software Engineer",
    bio: "I'm a passionate software engineer with 5 years of experience in web development.",
    hourlyRate: 100,
    profilePicture:
      "https://images.pexels.com/photos/997512/pexels-photo-997512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  const [activeTab, setActiveTab] = useState("personal");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated profile:", profile);
    // Implement your update logic here
  };

  return (
    <div className="my-2 mr-2 min-h-[calc(100vh-1rem)] rounded-lg bg-white pb-4 shadow-sm">
      <h3 className="border-b p-6 px-8 text-3xl font-semibold text-slate-800">
        Profile
      </h3>
      <div className="mx-4 max-w-5xl py-6 sm:px-6 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-lg bg-white shadow">
          <div className="relative h-24 bg-gradient-to-r from-blue-500 to-violet-500">
            <div className="absolute -bottom-16 left-4 h-32 w-32">
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="h-full w-full rounded-full object-cover object-[0%_10%] ring-4 ring-white"
              />
              <label
                htmlFor="file-upload"
                className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors hover:bg-gray-100"
              >
                <Camera className="h-5 w-5" />
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-16 sm:ml-36 sm:mt-0">
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{profile.profession}</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("personal")}
                className={`${
                  activeTab === "personal"
                    ? "border-slate-800 text-slate-800"
                    : "border-transparent text-slate-500 hover:border-slate-400 hover:text-slate-500"
                } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab("professional")}
                className={`${
                  activeTab === "professional"
                    ? "border-slate-800 text-slate-800"
                    : "border-transparent text-slate-500 hover:border-slate-400 hover:text-slate-400"
                } whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium`}
              >
                Professional Details
              </button>
            </nav>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            {activeTab === "personal" && (
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { name: "name", label: "Full Name", icon: User },
                  { name: "email", label: "Email", icon: Mail },
                  { name: "phone", label: "Phone Number", icon: Phone },
                  { name: "location", label: "Location", icon: MapPin },
                ].map(({ name, label, icon: Icon }) => (
                  <div key={name} className="relative">
                    <label
                      htmlFor={name}
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      {label}
                    </label>
                    <div className="mt-1 flex border-b">
                      <span className="inline-flex items-center rounded-l-md px-1 py-2 text-gray-500 sm:text-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                      <input
                        type={name === "email" ? "email" : "text"}
                        name={name}
                        id={name}
                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 px-2 outline-none sm:text-sm"
                        value={profile[name as keyof typeof profile]}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "professional" && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="profession"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Profession
                  </label>
                  <div className="mt-1 flex border-b">
                    <span className="inline-flex items-center rounded-l-md px-1 py-2 text-gray-500 sm:text-sm">
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      name="profession"
                      id="profession"
                      className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 px-2 outline-none sm:text-sm"
                      value={profile.profession}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    className="block w-full rounded-md border border-gray-300 p-1 px-2 sm:text-sm"
                    value={profile.bio}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="hourlyRate"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Hourly Rate (₹)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    id="hourlyRate"
                    className="block rounded-md border border-gray-300 px-2 py-2 sm:text-sm"
                    value={profile.hourlyRate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
