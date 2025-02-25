import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCompass,
  faCloudUpload,
  faUser,
  faLaugh,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { toggleTheme } from '../store/themeSlice';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const navItems = [
    { path: '/', icon: faHome, label: 'Home' },
    { path: '/explore', icon: faCompass, label: 'Explore' },
    { path: '/upload', icon: faCloudUpload, label: 'Upload' },
    { path: '/profile', icon: faUser, label: 'Profile' },
  ];

  return (
    <>
      {/* Fixed Header - Logo and Theme Toggle */}
      <nav className={`fixed top-0 left-0 w-full ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b z-50`}>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <FontAwesomeIcon 
                icon={faLaugh} 
                className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mr-2`} 
              />
              <span className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                MemeVerse
              </span>
            </Link>

            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-800' 
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="text-xl"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Content Padding */}
      <div className="pt-16 pb-16" />

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 w-full ${
        theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border-t z-50`}>
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                location.pathname === item.path
                  ? 'text-primary'
                  : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
