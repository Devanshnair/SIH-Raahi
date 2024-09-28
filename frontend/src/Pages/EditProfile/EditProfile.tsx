import { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, Save } from "lucide-react";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 99999 99999",
    location: "New York, NY",
    profession: "Software Engineer",
    bio: "I'm a passionate software engineer with 5 years of experience in web development.",
    hourlyRate: 100,
    profilePicture:
      "https://images.pexels.com/photos/997512/pexels-photo-997512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });

  const [activeTab, setActiveTab] = useState("personal");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-100 px-8 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow">
        <div className="md:flex">
          <div className="md:shrink-0">
            <div className="w-full overflow-hidden bg-gray-300 md:h-36 md:w-48">
              <img
                className="h-full w-full object-cover object-[0%_10%]"
                src={profile.profilePicture}
                alt="Profile"
              />
            </div>
          </div>
          <div className="w-full p-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {profile.name}
            </h1>
            <p className="text-gray-600">{profile.profession}</p>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("personal")}
              className={`${
                activeTab === "personal"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("professional")}
              className={`${
                activeTab === "professional"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium`}
            >
              Professional Details
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === "personal" && (
            <div className="space-y-6">
              {[
                {
                  name: "name",
                  label: "Full Name",
                  icon: <User className="h-5 w-5 text-gray-400" />,
                },
                {
                  name: "email",
                  label: "Email",
                  icon: <Mail className="h-5 w-5 text-gray-400" />,
                },
                {
                  name: "phone",
                  label: "Phone Number",
                  icon: <Phone className="h-5 w-5 text-gray-400" />,
                },
                {
                  name: "location",
                  label: "Location",
                  icon: <MapPin className="h-5 w-5 text-gray-400" />,
                },
              ].map(({ name, label, icon }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="ml-1 flex items-center text-sm font-medium text-gray-700"
                  >
                    {icon}
                    <span className="ml-2">{label}</span>
                  </label>
                  <input
                    type={name === "email" ? "email" : "text"}
                    name={name}
                    id={name}
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    value={profile[name]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "professional" && (
            <div className="space-y-6">
              {[
                {
                  name: "profession",
                  label: "Profession",
                  icon: <Briefcase className="h-5 w-5 text-gray-400" />,
                },
                { name: "bio", label: "Bio", icon: null },
                { name: "hourlyRate", label: "Hourly Rate (₹)", icon: null },
              ].map(({ name, label, icon }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="flex items-center text-sm font-medium text-gray-700"
                  >
                    {icon}
                    {icon && <span className="ml-2">{label}</span>}
                  </label>
                  {name === "bio" ? (
                    <textarea
                      id={name}
                      name={name}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 transition duration-150 ease-in-out focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="Tell us about yourself"
                      value={profile[name]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <input
                      type={name === "hourlyRate" ? "number" : "text"}
                      name={name}
                      id={name}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition duration-150 ease-in-out focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      value={profile[name]}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="mt-1 flex items-center space-x-5">
                <img
                  className="h-16 w-16 rounded-full border-2 border-gray-300"
                  src={profile.profilePicture}
                  alt="Profile"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span>Change</span>
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

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
