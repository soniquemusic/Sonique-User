// import React from 'react';
// import { useState, useEffect } from "react"
// import logo from "../../public/lightened_logo.png"
// import { FaHome, FaSearch, FaBell, FaCaretDown, FaCaretUp, FaTimes, FaTimesCircle, FaPalette } from "react-icons/fa"
// import avatar from "../../public/avatar.svg"
// import { useTheme } from "../../context/ThemeContext"
// import { useNavigate } from "react-router-dom"

// const Navbar = () => {
//     const { theme, themes, currentTheme, changeTheme, isThemeMenuOpen, toggleThemeMenu } = useTheme()

//     const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//     const [isSearchOpen, setIsSearchOpen] = useState(false)
//     const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768)
//     const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth === 768)
//     const [searchQuery, setSearchQuery] = useState("")
//     const [suggestions, setSuggestions] = useState([])
//     const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem("searchHistory")) || [])

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen)
//     }

//     const openSearch = () => {
//         setIsSearchOpen(true)
//     }

//     const closeSearch = () => {
//         setIsSearchOpen(false)
//         setSearchQuery("")
//         setSuggestions([])
//     }

//     const handleSearchChange = (e) => {
//         const value = e.target.value
//         setSearchQuery(value)

//         if (value) {
//             setSuggestions([`${value} Song`, `${value} Album`, `${value} Playlist`, `${value} Artist`])
//         } else {
//             setSuggestions([])
//         }
//     }

//     const clearSearch = () => {
//         setSearchQuery("")
//         setSuggestions([])
//     }

//     const saveSearch = (query) => {
//         if (query) {
//             const updatedHistory = [query, ...searchHistory.slice(0, 2)]
//             setSearchHistory(updatedHistory)
//             localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
//         }
//     }

//     const handleSearchSubmit = () => {
//         saveSearch(searchQuery)
//         setSearchQuery("")
//         setSuggestions([])
//         setIsSearchOpen(false)
//     }

//     useEffect(() => {
//         const handleResize = () => {
//             setIsLargeScreen(window.innerWidth > 768)
//             setIsMediumScreen(window.innerWidth === 768)
//         }

//         window.addEventListener("resize", handleResize)
//         return () => window.removeEventListener("resize", handleResize)
//     }, [])

//     const navigate = useNavigate()

//     const handleClick = () => {
//         navigate("/")
//     }

//     return (
//         <>
//             <nav className={`flex items-center justify-between ${theme.navBg} ${theme.text} px-4 sm:px-6 py-3`}>
//                 <div className="flex items-center gap-3">
//                     <img
//                         src={logo || "/placeholder.svg"}
//                         alt="Spotify Logo"
//                         className="w-30 sm:w-32 cursor-pointer transition-transform duration-200 hover:scale-105"
//                     />
//                 </div>

//                 <div
//                     className={`flex items-center gap-2 sm:gap-3 flex-grow max-w-md mx-2 ${isMediumScreen ? "justify-center" : ""
//                         }`}
//                 >
//                     <button
//                         className={`p-2 rounded-full ${theme.inputBg
//                             } hover:bg-opacity-80 flex items-center justify-center transition-colors duration-200 cursor-pointer`}
//                         onClick={handleClick}
//                     >
//                         <FaHome className="w-5 h-5 md:w-6 md:h-6" />
//                     </button>

//                     {isLargeScreen || isMediumScreen ? (
//                         <div className={`flex items-center ${theme.inputBg} px-4 py-2 rounded-full flex-grow relative`}>
//                             <FaSearch className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Search songs, albums, playlists..."
//                                 className={`bg-transparent text-sm ${theme.text} focus:outline-none flex-grow ml-3 placeholder-gray-400`}
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                             />
//                             {searchQuery && (
//                                 <button
//                                     onClick={clearSearch}
//                                     className="absolute right-4 text-gray-400 hover:text-white cursor-pointer"
//                                 >
//                                     <FaTimesCircle className="w-5 h-5 md:w-6 md:h-6" />
//                                 </button>
//                             )}

//                             {suggestions.length > 0 && (
//                                 <div
//                                     className={`absolute top-12 left-0 w-full ${theme.isDark ? "bg-neutral-800" : "bg-gray-100"} rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto`}
//                                 >
//                                     {suggestions.map((item, index) => (
//                                         <div
//                                             key={index}
//                                             className={`px-4 py-2 text-sm ${theme.text} ${theme.isDark ? "hover:bg-neutral-700" : "hover:bg-gray-200"} cursor-pointer transition-colors duration-200`}
//                                             onClick={() => saveSearch(item)}
//                                         >
//                                             {item}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <button
//                             onClick={openSearch}
//                             className={`p-2 rounded-full ${theme.inputBg} hover:bg-opacity-80 flex items-center justify-center transition-colors duration-200 cursor-pointer`}
//                         >
//                             <FaSearch className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
//                         </button>
//                     )}
//                 </div>

//                 <div className="flex items-center gap-2 sm:gap-3">
//                     <button
//                         className={`p-2 rounded-full ${theme.inputBg} hover:bg-opacity-80 hidden sm:flex items-center justify-center transition-colors duration-200 cursor-pointer`}
//                     >
//                         <FaBell className="w-5 h-5 md:w-6 md:h-6" />
//                     </button>

//                     <div className="relative">
//                         <button
//                             onClick={toggleThemeMenu}
//                             className={`p-2 rounded-full ${theme.inputBg} hover:bg-opacity-80 hidden sm:flex items-center justify-center transition-colors duration-200 cursor-pointer`}
//                         >
//                             <FaPalette className="w-5 h-5 md:w-6 md:h-6" />
//                         </button>

//                         {isThemeMenuOpen && (
//                             <div
//                                 className={`absolute right-0 mt-2 w-48 ${theme.isDark ? "bg-neutral-800" : "bg-gray-100"} rounded-lg shadow-lg z-20 py-2`}
//                             >
//                                 <div className="px-4 py-1 text-sm font-semibold text-gray-500">Select Theme</div>
//                                 {Object.entries(themes).map(([key, themeOption]) => (
//                                     <button
//                                         key={key}
//                                         onClick={() => changeTheme(key)}
//                                         className={`w-full px-4 py-2 text-sm text-left transition-colors duration-200 cursor-pointer flex items-center ${currentTheme === key ? "bg-opacity-20 font-medium" : ""
//                                             } ${themeOption.isDark ? "text-gray-300 hover:bg-neutral-700" : "text-gray-700 hover:bg-gray-200"}`}
//                                         style={{
//                                             backgroundColor: currentTheme === key ? `${themeOption.primary}20` : "",
//                                         }}
//                                     >
//                                         <span
//                                             className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
//                                             style={{
//                                                 background: `linear-gradient(145deg, ${themeOption.primary}, ${themeOption.secondary})`,
//                                             }}
//                                         ></span>
//                                         {themeOption.name}
//                                         {currentTheme === key && <span className="ml-auto">✓</span>}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <div className="relative">
//                         <button
//                             onClick={toggleDropdown}
//                             className={`p-2 rounded-full ${theme.inputBg} hover:bg-opacity-80 flex items-center justify-center transition-colors duration-200 cursor-pointer`}
//                         >
//                             <img
//                                 src={avatar || "/placeholder.svg"}
//                                 alt="User Avatar"
//                                 className="w-5 h-5 md:w-6 md:h-6 rounded-full"
//                             />
//                             {isDropdownOpen ? (
//                                 <FaCaretUp className="w-4 h-4 ml-1 text-gray-400 hidden sm:block" />
//                             ) : (
//                                 <FaCaretDown className="w-4 h-4 ml-1 text-gray-400 hidden sm:block" />
//                             )}
//                         </button>

//                         {isDropdownOpen && (
//                             <div
//                                 className={`absolute right-0 mt-2 w-40 ${theme.isDark ? "bg-neutral-800" : "bg-gray-100"} rounded-lg shadow-lg z-10`}
//                             >
//                                 <button
//                                     className={`w-full px-4 py-2 text-sm ${theme.text} ${theme.isDark ? "hover:bg-neutral-700" : "hover:bg-gray-200"} text-left transition-colors duration-200 cursor-pointer`}
//                                 >
//                                     Log in
//                                 </button>
//                                 <button
//                                     className={`w-full px-4 py-2 text-sm ${theme.text} ${theme.isDark ? "hover:bg-neutral-700" : "hover:bg-gray-200"} text-left transition-colors duration-200 cursor-pointer`}
//                                 >
//                                     Sign up
//                                 </button>
//                                 <button
//                                     className={`w-full px-4 py-2 text-sm ${theme.text} ${theme.isDark ? "hover:bg-neutral-700" : "hover:bg-gray-200"} text-left transition-colors duration-200 cursor-pointer`}
//                                 >
//                                     Logout
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </nav>

//             {!isLargeScreen && isSearchOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn">
//                     <div
//                         className={`w-full max-w-2xl ${theme.isDark ? "bg-neutral-900" : "bg-white"} rounded-lg p-6 relative shadow-2xl animate-slideUp`}
//                     >
//                         <button
//                             onClick={closeSearch}
//                             className={`absolute top-4 right-4 p-1 rounded-full ${theme.inputBg} hover:bg-opacity-80 flex items-center justify-center transition-colors duration-200 cursor-pointer`}
//                         >
//                             <FaTimes className="w-5 h-5 md:w-6 md:h-6" />
//                         </button>

//                         <div className={`flex items-center ${theme.inputBg} px-4 py-3 rounded-full shadow-md`}>
//                             <FaSearch className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Search songs, albums, playlists..."
//                                 className={`bg-transparent text-sm ${theme.text} focus:outline-none flex-grow ml-3 placeholder-gray-400`}
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}
//                                 onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
//                                 autoFocus
//                             />
//                         </div>

//                         {/* Display Suggestions in Canvas */}
//                         {suggestions.length > 0 && (
//                             <div
//                                 className={`mt-4 ${theme.isDark ? "bg-neutral-800" : "bg-gray-100"} rounded-lg shadow-lg max-h-60 overflow-y-auto border ${theme.isDark ? "border-neutral-700" : "border-gray-200"}`}
//                             >
//                                 {suggestions.map((item, index) => (
//                                     <div
//                                         key={index}
//                                         className={`px-4 py-2 text-sm ${theme.text} ${theme.isDark ? "hover:bg-neutral-700" : "hover:bg-gray-200"} cursor-pointer transition-colors duration-200`}
//                                         onClick={() => saveSearch(item)}
//                                     >
//                                         {item}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Display Search History in Canvas */}
//                         {searchHistory.length > 0 && (
//                             <div
//                                 className={`mt-4 ${theme.isDark ? "bg-neutral-800" : "bg-gray-100"} rounded-lg shadow-lg max-h-60 overflow-y-auto border ${theme.isDark ? "border-neutral-700" : "border-gray-200"}`}
//                             >
//                                 <div className={`px-4 py-2 text-sm ${theme.isDark ? "text-gray-400" : "text-gray-600"}`}>
//                                     Recent Searches
//                                 </div>
//                                 {searchHistory.map((item, index) => (
//                                     <div
//                                         key={index}
//                                         className={`px-4 py-2 text-sm ${theme.text} ${theme.isDark ? "hover:bg-neutral-700" : "hover:bg-gray-200"} cursor-pointer transition-colors duration-200`}
//                                         onClick={() => setSearchQuery(item)}
//                                     >
//                                         {item}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default Navbar

