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
  faLaugh,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
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
      {/* Fixed Header - Only Logo and Theme Toggle */}
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLaugh} className="text-2xl text-primary mr-2" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">MemeVerse</span>
            </div>

            {/* Theme toggle button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
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

      <div className="pt-16 pb-20">
        {/* Content padding */}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex justify-between items-center px-4 h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-gray-600 dark:text-gray-400'
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
