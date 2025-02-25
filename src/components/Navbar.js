import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleTheme } from '../store/themeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faCompass, 
  faCloudUpload, 
  faUser, 
  faChartBar,
  faSun,
  faMoon,
  faLaugh 
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useSelector((state) => state.theme.theme);

  const navItems = [
    { path: '/', icon: faHome, label: 'Home' },
    { path: '/explore', icon: faCompass, label: 'Explore' },
    { path: '/upload', icon: faCloudUpload, label: 'Upload' },
    { path: '/profile', icon: faUser, label: 'Profile' },
    { path: '/leaderboard', icon: faChartBar, label: 'Leaderboard' },
  ];

  return (
    <>
      {/* Fixed Header */}
      <nav className="fixed top-0 left-0 w-full  bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 text-gray-900">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center text-white">
              <FontAwesomeIcon icon={faLaugh} className="text-2xl text-primary mr-2" />
              <span className="text-xl font-semibold dark:text-white">MemeVerse</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-white bg-gray-700'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-2" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Theme toggle button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-white"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="text-xl text-white"
              /> Day/Night
            </button>
          </div>
        </div>
      </nav>

      {/* Content Padding */}
      <div className="pt-16">
        {/* This div adds padding to prevent content from being hidden under the fixed header */}
      </div>

     
    </>
  );
};

export default Navbar;
