import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { HeartIcon as HeartIconOutline, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const MemeCard = ({ meme }) => {
  const [liked, setLiked] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-md overflow-hidden mb-4`}
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src={meme.userProfile || 'https://via.placeholder.com/40'}
            alt={meme.username}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className={`text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {meme.username}
            </p>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {meme.timestamp}
            </p>
          </div>
        </div>

        <Link to={`/meme/${meme.id}`}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative aspect-square"
          >
            <img
              src={meme.url}
              alt={meme.caption}
              className="w-full h-full object-contain rounded-lg"
              loading="lazy"
            />
          </motion.div>
        </Link>

        <div className="mt-4">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`focus:outline-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {liked ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIconOutline className="h-6 w-6" />
              )}
            </motion.button>

            <Link 
              to={`/meme/${meme.id}`}
              className={`focus:outline-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <ChatBubbleLeftIcon className="h-6 w-6" />
            </Link>

            <button 
              className={`focus:outline-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <ShareIcon className="h-6 w-6" />
            </button>
          </div>

          <p className={`mt-3 text-sm ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {meme.caption}
          </p>

          {meme.likes > 0 && (
            <p className={`mt-1 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {meme.likes} likes
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MemeCard;
