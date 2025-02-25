import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { fetchMemes } from '../store/memesSlice';
import MemeCard from '../components/MemeCard';

const categories = ['Trending', 'New', 'Classic', 'Random'];

const Explorer = () => {
  const dispatch = useDispatch();
  const { memes, status } = useSelector((state) => state.memes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Trending');
  const [sortBy, setSortBy] = useState('likes');
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const debounceTimer = useRef(null);

  // Filter and sort memes
  useEffect(() => {
    let filtered = [...memes];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(meme => 
        meme.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    switch(selectedCategory) {
      case 'New':
        filtered = filtered.slice().reverse();
        break;
      case 'Classic':
        filtered = filtered.filter(meme => meme.height < meme.width);
        break;
      case 'Random':
        filtered = filtered.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }

    // Apply sorting
    switch(sortBy) {
      case 'likes':
        filtered = filtered.sort((a, b) => b.height - a.height);
        break;
      case 'date':
        filtered = filtered.sort((a, b) => b.width - a.width);
        break;
      case 'comments':
        filtered = filtered.sort((a, b) => a.box_count - b.box_count);
        break;
      default:
        break;
    }

    setDisplayedMemes(filtered.slice(0, page * 10));
  }, [memes, searchTerm, selectedCategory, sortBy, page]);

  // Implement infinite scroll
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && status !== 'loading') {
      setPage((prev) => prev + 1);
    }
  }, [status]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  // Debounced search
  const handleSearch = (value) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setSearchTerm(value);
      setPage(1);
    }, 300);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search and Filter Section */}
      <div className="sticky  z-40 bg-white dark:bg-pink-200 p-4 rounded-xl shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */ }
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
            <input
              type="text"
              placeholder="Search memes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-accent focus:border-transparent text-black"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border dark:border-gray-700 dark:bg-gray-100 px-4 py-2"
            >
              <option value="likes">Most Liked</option>
              <option value="date">Latest</option>
              <option value="comments">Most Comments</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border-black whitespace-nowrap transition-colors dark:text-white ${
                selectedCategory === category
                  ? 'bg-red-500 text-black '
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Memes Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white"
        layout
      >
        {displayedMemes.map((meme) => (
          <motion.div
            key={meme.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MemeCard meme={meme} />
          </motion.div>
        ))}
      </motion.div>

      {/* Loading Indicator */}
      <div ref={loader} className="h-20 flex items-center justify-center">
        {status === 'loading' && (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
