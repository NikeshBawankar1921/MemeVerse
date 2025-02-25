import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { TrophyIcon, FireIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const Leaderboard = () => {
  const { memes, likedMemes } = useSelector((state) => state.memes);

  // Sort memes by likes
  const topMemes = [...memes]
    .sort((a, b) => {
      const aLikes = likedMemes.filter(id => id === a.id).length;
      const bLikes = likedMemes.filter(id => id === b.id).length;
      return bLikes - aLikes;
    })
    .slice(0, 10);

  // Mock user data for demonstration
  const topUsers = [
    { id: 1, name: 'MemeKing', points: 1200, uploads: 45, likes: 890 },
    { id: 2, name: 'LaughMaster', points: 980, uploads: 32, likes: 756 },
    { id: 3, name: 'MemeQueen', points: 850, uploads: 28, likes: 643 },
    { id: 4, name: 'JokeLord', points: 720, uploads: 25, likes: 534 },
    { id: 5, name: 'MemeGuru', points: 650, uploads: 20, likes: 489 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Top Users Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrophyIcon className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">Top Contributors</h2>
          </div>

          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.points} points
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <FireIcon className="h-5 w-5 text-orange-500" />
                    <span>{user.uploads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChatBubbleLeftIcon className="h-5 w-5 text-blue-500" />
                    <span>{user.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Memes Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FireIcon className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Top Memes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topMemes.map((meme, index) => (
              <motion.div
                key={meme.id}
                variants={itemVariants}
                className="relative rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800"
              >
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-bold">#{index + 1}</span>
                      <h3 className="font-medium truncate">{meme.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <FireIcon className="h-4 w-4" />
                        <span>{likedMemes.filter(id => id === meme.id).length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
