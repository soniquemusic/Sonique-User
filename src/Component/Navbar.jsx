import React, { useState } from "react";
import { FaHome, FaSearch, FaBell, FaCaretDown, FaCaretUp, FaTimesCircle } from "react-icons/fa";
import logo from "../../public/lightened_logo.png";
import avatar from "../../public/avatar.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <nav className="flex items-center justify-between bg-neutral-900 text-white px-4 sm:px-6 py-3 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo || "/placeholder.svg"}
          alt="App Logo"
          className="w-30 sm:w-32 cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Search and Home */}
      <div className="flex items-center gap-3 flex-grow max-w-md mx-2">
        <button
          className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
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

      {/* Icons */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors">
          <FaBell className="w-5 h-5" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center transition-colors"
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
              <button className="w-full px-4 py-2 text-sm text-left text-white hover:bg-neutral-700">
                Log in
              </button>
              <button className="w-full px-4 py-2 text-sm text-left text-white hover:bg-neutral-700">
                Sign up
              </button>
              <button className="w-full px-4 py-2 text-sm text-left text-white hover:bg-neutral-700">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
