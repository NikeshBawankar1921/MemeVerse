import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash/debounce';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import MemeCard from '../components/MemeCard';

const Explorer = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Trending');
  const [sortBy, setSortBy] = useState('likes');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Trending', 'New', 'Classic', 'Random'];
  const sortOptions = [
    { value: 'likes', label: 'Most Liked' },
    { value: 'date', label: 'Latest' },
    { value: 'comments', label: 'Most Comments' }
  ];

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      fetchMemes(1, query);
    }, 500),
    []
  );

  const fetchMemes = async (pageNum, query = searchQuery) => {
    try {
      setLoading(true);
      // Replace with your actual API call
      const response = await fetch(`https://api.imgflip.com/get_memes`);
      const data = await response.json();
      
      // Simulate filtering and sorting
      let filteredMemes = data.data.memes.map(meme => ({
        ...meme,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        date: new Date(Date.now() - Math.random() * 10000000000).toISOString()
      }));

      // Apply filters
      if (query) {
        filteredMemes = filteredMemes.filter(meme => 
          meme.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Apply category filters
      switch (selectedCategory) {
        case 'New':
          filteredMemes.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'Classic':
          filteredMemes = filteredMemes.filter(meme => meme.likes > 500);
          break;
        case 'Random':
          filteredMemes.sort(() => Math.random() - 0.5);
          break;
        default:
          filteredMemes.sort((a, b) => b.likes - a.likes);
      }

      // Apply sorting
      switch (sortBy) {
        case 'date':
          filteredMemes.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'comments':
          filteredMemes.sort((a, b) => b.comments - a.comments);
          break;
        default:
          filteredMemes.sort((a, b) => b.likes - a.likes);
      }

      setMemes(pageNum === 1 ? filteredMemes : [...memes, ...filteredMemes]);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching memes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes(1);
  }, [selectedCategory, sortBy]);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      if (!loading) {
        fetchMemes(page + 1);
      }
    }
  }, [page, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-16 z-40 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } p-4 rounded-xl shadow-lg mb-6`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search memes..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-primary focus:border-transparent`}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`sm:hidden p-2 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>

          {/* Filters for Desktop */}
          <div className="hidden sm:flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`rounded-lg border px-4 py-2 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden mt-4"
            >
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full rounded-lg border px-4 py-2 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Memes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {memes.map((meme, index) => (
            <motion.div
              key={`${meme.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <MemeCard meme={meme} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default Explorer;
