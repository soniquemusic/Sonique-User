import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const API_BASE = "https://sonique-server.onrender.com";

const Profile = () => {
  const [hover, setHover] = useState(false);
  const [profile, setProfile] = useState({
    user: {
      fullName: "",
      email: "",
      gender: "",
      mobileNumber: "",
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await axios.get(`${API_BASE}/sonique/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch profile", error.response?.data || error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const tracks = [
    {
      id: 1,
      title: "Jooma Chumma De De",
      artists: "Sudesh Bhosle, Kavita Krishnamurthy, Laxmikant-Pyarelal",
      album: "Hum",
      duration: "8:21",
      image: "https://i.scdn.co/image/ab67616d000048518aff958bc149839f43717af7",
    },
    {
      id: 2,
      title: "Triple OG",
      artists: "DIVINE, Phenom",
      album: "Triple OG",
      duration: "3:03",
      image: "https://i.scdn.co/image/ab67616d00004851dda096d645f97ed3bc4a6366",
    },
    {
      id: 3,
      title: "Homa Dol",
      artists: "Saad Lamjarred, Neeti Mohan, Rajat Nagpal",
      album: "Homa Dol",
      duration: "4:05",
      image: "https://i.scdn.co/image/ab67616d00004851389786b8e732998f25fc651c",
    },
    {
      id: 4,
      title: "Dabya Ni Karde",
      artists: "Bintu Pabra, Ndee Kundu",
      album: "Dabya Ni Karde",
      duration: "3:39",
      image: "https://i.scdn.co/image/ab67616d000048512aa7cf8067bf5de5202ddab6",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        return;
      }

      setIsLoading(true);

      // First update profile data
      await axios.put(
        `${API_BASE}/sonique/user/update-profile`,
        profile.user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Then upload profile picture if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append('profilePicture', selectedFile);

        await axios.post(
          `${API_BASE}/sonique/user/upload-profile-picture`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      await fetchProfile();
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      {/* Profile Header */}
      <div className="w-full mx-auto bg-gradient-to-b from-[#5e857c]/50 to-black p-4 sm:p-8 rounded-lg mb-8 sm:mb-30">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-5">
          {/* Profile Image */}
          <div
            className="w-32 h-32 sm:w-50 sm:h-50 bg-gradient-to-br from-[#5e857c]/90 to-black rounded-full flex flex-col items-center justify-center relative cursor-pointer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={openModal}
          >
            {profile.user.profilePicture ? (
              <img
                src={profile.user.profilePicture}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <>
                {!hover ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-20 h-20 sm:w-24 sm:h-24 transition-all duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 19.5a7.5 7.5 0 0115 0"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 2.487a2.11 2.11 0 0 1 2.985 2.985l-9.9 9.9a4.222 4.222 0 0 1-1.696 1.053l-4.172 1.391a1.056 1.056 0 0 1-1.34-1.34l1.39-4.172a4.222 4.222 0 0 1 1.054-1.696l9.9-9.9Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 8.25h.008v.008H18V8.25Z"
                    />
                  </svg>
                )}
              </>
            )}

            {/* "Choose Photo" Text (Only Visible on Hover) */}
            {hover && (
              <p className="text-white text-sm mt-2 transition-opacity duration-300">
                Choose photo
              </p>
            )}
          </div>

          {/* Profile Details */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-300">Profile</p>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white">
              {profile?.user?.fullName}
            </h1>
            <p className="text-gray-400">• 1 Following</p>
          </div>
        </div>
      </div>

      {/* Top Tracks Section */}
      <div className="w-full px-4 sm:px-8 mb-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Top tracks this month</h1>
            <p className="text-white text-sm pt-2">Only visible to you</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors text-sm font-bold">
            Show all
          </button>
        </div>

        {/* Tracks List */}
        <div className="space-y-2">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="group flex flex-col-2 sm:flex-row items-center gap-4 rounded-md p-2 hover:bg-gray-800/30 transition-colors cursor-pointer"
            >
              {/* Track Number */}
              <span className="w-6 text-right text-base text-gray-400 group-hover:text-white">
                {track.id}
              </span>

              {/* Track Image */}
              <div className="w-12 h-12 relative">
                <img
                  src={track.image}
                  alt={track.title}
                  width={48}
                  height={48}
                  className="object-cover rounded"
                />
              </div>

              {/* Track Title and Artists */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[#5e857c] text-base font-normal truncate">{track.title}</h3>
                <p className="text-gray-400 text-sm truncate">{track.artists}</p>
              </div>

              {/* Album Name */}
              <div className="text-gray-400 text-sm hidden md:block flex-1">{track.album}</div>

              {/* Check Icon */}
              <div className="w-6 flex justify-center">
                <FaCheck className="text-[#1ED760] w-4 h-4" />
              </div>

              {/* Track Duration */}
              <div className="text-gray-400 text-sm w-12 text-right">{track.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div
            className=" rounded-xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 border border-[#5e857c]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[#5e857c] text-2xl font-bold tracking-tight">Profile details</h2>
              <button
                onClick={closeModal}
                className="text-[#5e857c]/80 hover:text-[#5e857c] transition-colors rounded-full p-1 hover:bg-[#5e857c]/10"
                aria-label="Close modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative group">
                <label htmlFor="profilePicture" className="cursor-pointer">
                  <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#5e857c]/90 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 border border-[#5e857c]/20">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : profile.user.profilePicture ? (
                      <img
                        src={profile.user.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-16 h-16 text-[#5e857c]/50 transition-opacity group-hover:opacity-80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      </svg>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full cursor-pointer transition-opacity opacity-0 group-hover:opacity-100 bg-[#5e857c]/30 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Choose photo</span>
                  </div>
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="relative mb-8">
              <label htmlFor="fullName" className="block text-[#5e857c]/80 text-sm mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profile?.user?.fullName || ""}
                onChange={handleChange}
                className="w-full bg-[#5e857c]/10 text-white px-4 py-3 rounded-md outline-none ring-2 ring-transparent focus:ring-[#5e857c]/50 transition-shadow text-[15px] font-medium border border-[#5e857c]/20"
              />
            </div>

            <div className="relative mb-8">
              <label htmlFor="email" className="block text-[#5e857c]/80 text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile?.user?.email || ""}
                onChange={handleChange}
                className="w-full bg-[#5e857c]/10 text-white px-4 py-3 rounded-md outline-none ring-2 ring-transparent focus:ring-[#5e857c]/50 transition-shadow text-[15px] font-medium border border-[#5e857c]/20"
              />
            </div>

            <div className="relative mb-8">
              <label htmlFor="gender" className="block text-[#5e857c]/80 text-sm mb-1">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={profile?.user?.gender}
                onChange={handleChange}
                className="cursor-not-allowed w-full bg-[#5e857c]/10 text-white px-4 py-3 rounded-md outline-none ring-2 ring-transparent focus:ring-[#5e857c]/50 transition-shadow text-[15px] font-medium border border-[#5e857c]/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/60">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0-2 2h14a2 2 0 0 0-2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
            </div>

            <div className="relative mb-8">
              <label htmlFor="mobileNumber" className="block text-[#5e857c]/80 text-sm mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={profile?.user?.mobileNumber || ""}
                onChange={handleChange}
                className="w-full bg-[#5e857c]/10 text-white px-4 py-3 rounded-md outline-none ring-2 ring-transparent focus:ring-[#5e857c]/50 transition-shadow text-[15px] font-medium border border-[#5e857c]/20"
              />
            </div>

            <div className="flex justify-end gap-4 mb-6">
              <button
                onClick={saveProfile}
                disabled={isLoading}
                className={`bg-[#5e857c] hover:bg-[#5e857c]/90 text-white px-8 py-2.5 rounded-full font-semibold transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>

            <p className="text-[#5e857c]/70 text-[13px] text-center leading-5 px-4">
              By proceeding, you agree to give access to the image you choose to upload.
              <br />
              Please make sure you have the right to upload the image.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;