import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const [randomMeme, setRandomMeme] = useState(null);

  useEffect(() => {
    // Fetch a random meme for the 404 page
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => {
        const memes = data.data.memes;
        const random = memes[Math.floor(Math.random() * memes.length)];
        setRandomMeme(random);
      })
      .catch(() => {
        // Fallback meme if API fails
        setRandomMeme({
          url: 'https://i.imgflip.com/1bij.jpg',
          name: 'One Does Not Simply',
        });
      });
  }, []);

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="text-center px-4"
      >
        <motion.h1
          variants={itemVariants}
          className="text-8xl font-bold text-accent mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold mb-6"
        >
          One Does Not Simply Find This Page
        </motion.h2>

        {randomMeme && (
          <motion.div
            variants={itemVariants}
            className="max-w-md mx-auto mb-8"
          >
            <img
              src={randomMeme.url}
              alt={randomMeme.name}
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>
        )}

        <motion.p
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Looks like you've wandered into the meme void.
          <br />
          But don't worry, there are plenty of memes to explore!
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="space-x-4"
        >
          <Link
            to="/"
            className="btn btn-primary"
          >
            Go Home
          </Link>
          <Link
            to="/explore"
            className="btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Explore Memes
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
