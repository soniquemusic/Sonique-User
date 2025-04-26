import React, { useCallback, useMemo, useRef, useState } from 'react';

const ToggleSwitch = React.memo(({ label, value, onChange }) => {
  const toggleClass = useMemo(
    () => `w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${value ? 'bg-green-500' : 'bg-gray-700'}`,
    [value]
  );
  const circleClass = useMemo(
    () => `h-5 w-5 rounded-full bg-white transition ${value ? 'translate-x-4' : ''}`,
    [value]
  );

  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-400">{label}</span>
      <button className={toggleClass} onClick={onChange}>
        <div className={circleClass}></div>
      </button>
    </div>
  );
});

const Settings = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [toggles, setToggles] = useState({
    compactLibraryLayout: false,
    nowPlayingPanel: false,
    canvasVisuals: false,
    showFollowerList: false,
  });

  const handleToggle = useCallback((key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const inputRef = useRef(null);

  const toggleSearch = useCallback(() => {
    setIsSearchVisible((prev) => {
      const newState = !prev;
      if (!prev && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      return newState;
    });
  }, []);

  const handleBlur = useCallback(() => {
    setIsSearchVisible(false);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-[80rem] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <div className="w-full sm:w-1/3 flex justify-end">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search settings..."
                className={`w-full p-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600 transition-all duration-300 ease-in-out ${isSearchVisible ? 'opacity-100 w-full' : 'opacity-0 w-0'
                  }`}
                onBlur={handleBlur}
                style={{ transition: 'opacity 0.3s ease-in-out, width 0.3s ease-in-out' }}
              />
              <button
                className={`p-2 text-white focus:outline-none absolute right-0 transition-all duration-300 ease-in-out ${isSearchVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                onClick={toggleSearch}
                style={{ transition: 'opacity 0.3s ease-in-out' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Account</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
            <p className="text-gray-400 flex-1">Edit login methods</p>
            <button className="text-gray-400 border hover:text-gray-400 border-gray-500 hover:border-gray-600 px-4 py-2 rounded-full">
              Edit
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Language</h2>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <p className="text-gray-400 flex-1 break-words">
              Changes will be applied after restarting the app
            </p>
            <div className="flex-1 w-full sm:w-auto min-w-[150px]">
              <select className="w-full p-2 bg-gray-800 text-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600">
                <option value="en">English (United Kingdom)</option>
                <option value="en-US">English (United States)</option>
                <option value="es">Spanish (Español)</option>
                <option value="fr">French (Français)</option>
                <option value="de">German (Deutsch)</option>
                <option value="zh">Chinese (中文)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="ar">Arabic (العربية)</option>
                <option value="pt">Portuguese (Português)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p className="text-gray-400">English (United Kingdom)</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Library</h2>
          <ToggleSwitch
            label="Use compact library layout"
            value={toggles.compactLibraryLayout}
            onChange={() => handleToggle('compactLibraryLayout')}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Display</h2>
          <ToggleSwitch
            label="Show the now-playing panel on click of play"
            value={toggles.nowPlayingPanel}
            onChange={() => handleToggle('nowPlayingPanel')}
          />
          <ToggleSwitch
            label="Display short, looping visuals on tracks (Canvas)"
            value={toggles.canvasVisuals}
            onChange={() => handleToggle('canvasVisuals')}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Social</h2>
          <ToggleSwitch
            label="Show my follower and following lists on my public profile"
            value={toggles.showFollowerList}
            onChange={() => handleToggle('showFollowerList')}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
