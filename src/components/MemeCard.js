import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { likeMeme, unlikeMeme } from '../store/memesSlice';

const MemeCard = ({ meme }) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const likedMemes = useSelector((state) => state.memes.likedMemes);
  const isLiked = likedMemes.includes(meme.id);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikeMeme(meme.id));
    } else {
      dispatch(likeMeme(meme.id));
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4"
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{meme.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">@user</p>
          </div>
        </div>

        {/* Image */}
        <Link to={`/meme/${meme.id}`}>
          <motion.div 
            className="relative aspect-square bg-gray-100 dark:bg-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-full object-contain "
              loading="lazy"
            />
          </motion.div>
        </Link>

        {/* Actions */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className="flex items-center text-gray-600 dark:text-gray-300"
              >
                <AnimatePresence mode="wait">
                  {isLiked ? (
                    <motion.div
                      key="liked"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unliked"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <HeartIcon className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <button 
                onClick={() => setShowComments(!showComments)}
                className="flex items-center text-gray-600 dark:text-gray-300"
              > <Link to={`/meme/${meme.id}`}>
                <ChatBubbleLeftIcon className="h-7 w-7"  />
                </Link>
              </button>

              <button className="flex items-center text-gray-600 dark:text-gray-300">
                <ShareIcon className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemeCard;
