import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaCaretDown,
  FaCaretUp,
  FaTimesCircle,
  FaBars,
} from "react-icons/fa";
import logo from "../../public/lightened_logo.png";
import avatar from "../../public/avatar.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      setSuggestions([`${value} Song`, `${value} Album`, `${value} Playlist`, `${value} Artist`]);
    } else {
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleLogout = () => setShowLogoutConfirm(true);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogoutConfirm(false);
    setIsDropdownOpen(false);
    navigate("/sonique/user/login");
  };

  const cancelLogout = () => setShowLogoutConfirm(false);

  return (
    <>
      <nav className="bg-neutral-900 text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          {/* Logo and Hamburger */}
          <div className="flex items-center gap-3">
            <img
              src={logo || "/placeholder.svg"}
              alt="App Logo"
              className="w-36 sm:w-32 cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => navigate("/")}
            />
            <button
              className="sm:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden sm:flex items-center gap-3 flex-grow max-w-md mx-2">
            <button
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700"
              onClick={() => navigate("/")}
            >
              <FaHome className="w-5 h-5" />
            </button>

            <div className="flex items-center bg-neutral-800 px-4 py-2 rounded-full flex-grow relative">
              <FaSearch className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search songs, albums, playlists..."
                className="bg-transparent text-sm text-white focus:outline-none flex-grow ml-3 placeholder-gray-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-4 text-gray-400 hover:text-white">
                  <FaTimesCircle className="w-5 h-5" />
                </button>
              )}
              {suggestions.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-neutral-800 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto border border-neutral-700">
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex sm:hidden items-center gap-3 flex-grow max-w-md mx-2">
            <button
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700"
              onClick={() => navigate("/")}
            >
              <FaHome className="w-5 h-5" />
            </button>
          </div>




          {/* Icons + Profile */}
          <div className="flex items-center gap-3">



            <button className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
              <FaBell className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center"
              >
                <img src={avatar || "/placeholder.svg"} alt="User Avatar" className="w-6 h-6 rounded-full" />
                {isDropdownOpen ? (
                  <FaCaretUp className="w-4 h-4 ml-1 text-gray-400" />
                ) : (
                  <FaCaretDown className="w-4 h-4 ml-1 text-gray-400" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-neutral-800 rounded-lg shadow-lg z-10 border border-neutral-700">
                  <button
                    className="w-full px-4 py-2 text-sm text-left text-white hover:bg-neutral-700"
                    onClick={() => navigate("/sonique/user/profile")}
                  >
                    Profile
                  </button>

                  <button
                    className="w-full px-4 py-2 text-sm text-left text-white hover:bg-neutral-700"
                    onClick={() => navigate("/sonique/user/setting")}
                  >
                    Setting
                  </button>

                  <button
                    className="w-full px-4 py-2 text-sm text-left text-white hover:bg-neutral-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search & Navigation */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 space-y-3">

            <div className="bg-neutral-800 px-4 py-2 rounded-full flex items-center relative">
              <FaSearch className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-white focus:outline-none flex-grow ml-3 placeholder-gray-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button onClick={clearSearch} className="absolute right-4 text-gray-400 hover:text-white">
                  <FaTimesCircle className="w-5 h-5" />
                </button>
              )}
              {suggestions.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-neutral-800 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto border border-neutral-700">
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm text-white hover:bg-neutral-700 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-sm rounded-md bg-neutral-700 text-white hover:bg-neutral-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
