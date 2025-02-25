import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchMemes } from '../store/memesSlice';
import MemeCard from '../components/MemeCard';

const Home = () => {
  const dispatch = useDispatch();
  const { memes, status, error } = useSelector((state) => state.memes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMemes());
    }
  }, [status, dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto space-y-6"
    >
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
      
    </motion.div>
    
  );
};

export default Home;
