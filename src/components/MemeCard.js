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
      className="bg-white dark:bg-secondary rounded-xl shadow-lg overflow-hidden "
    >
      {/* Header */}
      <div className="flex items-center p-4">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="ml-3">
          <p className="font-medium">{meme.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">@user</p>
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
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="focus:outline-none"
          >
            <AnimatePresence mode="wait">
              {isLiked ? (
                <motion.div
                  key="liked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <HeartIconSolid className="h-7 w-7 text-red-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="unliked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <HeartIcon className="h-7 w-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="focus:outline-none"
          >
            <ChatBubbleLeftIcon className="h-2 w-7" />
          </button>
          <button className="focus:outline-none">
            <ShareIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
      <div className=" pt-4">
        {/* This div adds padding to prevent content from being hidden under the fixed navbars */}
      </div>
    </motion.div>
  );
};

export default MemeCard;
