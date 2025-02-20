import { useState } from "react";
import { FaBars, FaUserCircle, FaEdit } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 bg-gray-800 p-2 rounded-md text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 h-full w-64 bg-gray-800 p-4 flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        <button
          className="lg:hidden self-end text-white cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* Top Section */}
        <h1 className="text-lg font-bold text-center mb-6 text-white">
          AI Chatbot
        </h1>

        {/* Sidebar Menu */}
        <nav className="flex-1 space-y-3 md:text-base">
          <div className="flex items-center space-x-3 text-gray-400 hover:text-white cursor-pointer">
            <FaEdit />
            <span>New Chat</span>
          </div>
        </nav>

        {/* Profile Section */}
        <div className="relative mt-auto">
          <button
            className="w-full flex items-center justify-between py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded text-white cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <span className="flex items-center space-x-2">
              <FaUserCircle size={20} />
              <span>User Profile</span>
            </span>
            <span>▼</span>
          </button>

          {isProfileOpen && (
            <div className="absolute bottom-12 left-0 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg">
              <ul className="text-sm text-gray-300">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
