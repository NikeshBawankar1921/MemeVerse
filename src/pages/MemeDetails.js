import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { likeMeme, unlikeMeme } from '../store/memesSlice';

const MemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memes, likedMemes } = useSelector((state) => state.memes);
  const [meme, setMeme] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundMeme = memes.find(m => m.id === id);
    if (foundMeme) {
      setMeme(foundMeme);
      setIsLiked(likedMemes.includes(id));
      
      // Load comments from localStorage
      const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
      setComments(savedComments);
    }
  }, [id, memes, likedMemes]);

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikeMeme(id));
      setIsLiked(false);
    } else {
      dispatch(likeMeme(id));
      setIsLiked(true);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      text: comment,
      username: 'User',
      timestamp: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setComment('');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: meme.name,
        text: 'Check out this awesome meme!',
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!meme) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 mb-6  transition-colors "
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span className="">Back</span>
      </button>

      <div className="bg-white bg-gray-900  rounded-xl shadow-lg overflow-hidden ">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
          <img
            src={meme.url}
            alt={meme.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Actions */}
        <div className="p-4">
          <div className="flex items-center justify-between">
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
                      <HeartIconSolid className="h-7 w-7 text-gray-900" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unliked"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <HeartIcon className="h-7 w-7 text-gray-900 " />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <ChatBubbleLeftIcon className="h-7 w-7 text-gray-900" />
              <button onClick={handleShare}>
                <ShareIcon className="h-7 w-7 text-gray-900" />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {comments.length} comments
            </div>
          </div>

          {/* Caption */}
          <div className="mt-4">
            <h2 className="text-xl font-bold">{meme.name}</h2>
            <p className="text-gray-900 mt-1">
              {likedMemes.includes(id) ? '1 like' : '0 likes'}
            </p>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleComment} className="mt-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 rounded-lg border dark:border-gray-700 dark:bg-gray-800 px-4 py-2 text-white"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="btn btn-primary"
              >
                Post
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="mt-6 space-y-4">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{comment.username}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1">{comment.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className=" pb-4 pt-4">
        {/* This div adds padding to prevent content from being hidden under the fixed navbars */}
      </div>
    </motion.div>
    
  );
};

export default MemeDetails;
