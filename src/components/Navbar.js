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
      {/* Top Logo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-secondary shadow-sm justify-center ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-14">
            <Link to="/" className="flex items-center space-x-2">
              <FontAwesomeIcon 
                icon={faLaugh} 
                className="h-6 w-6 text-accent" 
              />
              <motion.h1 
                className="text-xl font-semibold text-accent"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                MemeVerse
              </motion.h1>
            </Link>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="flex flex-col items-center px-3 py-1"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon}
                className="h-6 w-6 mb-1 text-gray-500 dark:text-gray-400"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Theme
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-pink-200 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center px-3 py-1"
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  className={`h-6 w-6 mb-1 transition-colors duration-200 ${
                    location.pathname === item.path 
                      ? 'text-accent' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                />
                <span className={`text-xs transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'text-accent font-medium' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}

            
          </div>
        </div>
      </nav>

      {/* Main Content Padding */}
      <div className=" pt-4">
        {/* This div adds padding to prevent content from being hidden under the fixed navbars */}
      </div>
    </>
  );
};

export default Navbar;
