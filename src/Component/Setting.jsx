import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronRight, FiEdit2, FiLock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleSwitch = React.memo(({ label, value, onChange }) => {
  const toggleClass = useMemo(
    () => `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${value ? 'bg-[#5C817A]' : 'bg-gray-600'}`,
    [value]
  );
  const circleClass = useMemo(
    () => `inline-block h-5 w-5 transform rounded-full bg-white transition ${value ? 'translate-x-6' : 'translate-x-1'}`,
    [value]
  );

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-300 text-sm font-medium">{label}</span>
      <button
        type="button"
        className={toggleClass}
        onClick={onChange}
        aria-pressed={value}
      >
        <span className="sr-only">{label}</span>
        <span className={circleClass} />
      </button>
    </div>
  );
});

const Settings = () => {
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [toggles, setToggles] = useState({
    compactLibraryLayout: false,
    nowPlayingPanel: true,
    canvasVisuals: true,
    showFollowerList: true,
  });
  const inputRef = useRef(null);

  const handleToggle = useCallback((key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

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

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          label: "Edit login methods",
          action: () => console.log("Edit login methods"),
          icon: <FiEdit2 className="text-gray-400" />,
          rightText: null
        },
        {
          label: "Change your account password",
          action: () => navigate('/sonique/user/change-password'),
          icon: <FiLock className="text-gray-400" />,
          rightText: null
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          label: "Language",
          description: "Changes will be applied after restarting the app",
          action: null,
          rightText: "English (UK)",
          isSelect: true
        },
        {
          label: "Email notifications",
          description: "Manage your email preferences",
          action: null,
          rightText: "Configure",
          isSelect: false
        }
      ]
    },
    {
      title: "Appearance",
      items: [
        {
          label: "Use compact library layout",
          isToggle: true,
          toggleKey: "compactLibraryLayout"
        },
        {
          label: "Show now-playing panel",
          isToggle: true,
          toggleKey: "nowPlayingPanel"
        },
        {
          label: "Enable canvas visuals",
          isToggle: true,
          toggleKey: "canvasVisuals"
        }
      ]
    },
    {
      title: "Privacy",
      items: [
        {
          label: "Show follower lists",
          isToggle: true,
          toggleKey: "showFollowerList"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100">
      {/* Header */}
      <header className="sticky top-0 bg-[#121212] bg-opacity-90 backdrop-blur-sm p-4 border-b border-[#282828]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Settings</h1>

          <div className="relative">
            <AnimatePresence>
              {isSearchVisible && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 200 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="origin-right"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search settings..."
                    className="w-full bg-[#282828] text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5C817A]"
                    onBlur={handleBlur}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={toggleSearch}
              className={`p-2 text-gray-400 hover:text-white transition-colors ${isSearchVisible ? 'absolute right-2 top-1/2 transform -translate-y-1/2' : ''}`}
              aria-label="Search settings"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 pb-24">
        {settingsSections.map((section, sectionIndex) => (
          <motion.section
            key={sectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.05 }}
            className="mb-8 bg-[#181818] rounded-xl overflow-hidden shadow-lg"
          >
            <div className="p-4 border-b border-[#282828]">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            </div>

            <div className="divide-y divide-[#282828]">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="px-4 py-3 hover:bg-[#282828] transition-colors">
                  {item.isToggle ? (
                    <ToggleSwitch
                      label={item.label}
                      value={toggles[item.toggleKey]}
                      onChange={() => handleToggle(item.toggleKey)}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={item.action || undefined}
                    >
                      <div className="flex items-center">
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        <div>
                          <p className="text-sm font-medium text-gray-100">{item.label}</p>
                          {item.description && (
                            <p className="text-xs text-gray-400">{item.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center">
                        {item.rightText && (
                          <span className="text-sm text-gray-400 mr-2">
                            {item.rightText}
                          </span>
                        )}
                        {item.isSelect ? (
                          <select
                            className="bg-[#282828] text-gray-300 text-sm rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#5C817A]"
                            defaultValue="en"
                          >
                            <option value="en">English (UK)</option>
                            <option value="en-US">English (US)</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                          </select>
                        ) : (
                          <FiChevronRight className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
};

export default Settings;