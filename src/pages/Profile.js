import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilIcon, CameraIcon } from '@heroicons/react/24/outline';
import MemeCard from '../components/MemeCard';

const Profile = () => {
  const { userMemes, likedMemes, memes, status } = useSelector((state) => state.memes);
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: localStorage.getItem('profile_name') || 'MemeVerse User',
    bio: localStorage.getItem('profile_bio') || 'No bio yet',
    avatar: localStorage.getItem('profile_avatar') || '',
  });

  useEffect(() => {
    localStorage.setItem('profile_name', profile.name);
    localStorage.setItem('profile_bio', profile.bio);
    if (profile.avatar) {
      localStorage.setItem('profile_avatar', profile.avatar);
    }
  }, [profile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      setUploadLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
        setUploadLoading(false);
      };
      reader.onerror = () => {
        alert('Error uploading image. Please try again.');
        setUploadLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const getLikedMemes = () => {
    return likedMemes.map(likedId => {
      // First try to find in API memes
      const apiMeme = memes.find(m => m.id === likedId);
      if (apiMeme) return apiMeme;
      
      // If not found in API memes, try user memes
      const userMeme = userMemes.find(m => m.id === likedId);
      if (userMeme) return userMeme;
      
      return null;
    }).filter(meme => meme !== null);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white">
          {/* Avatar */}
          <div className="relative group">
            <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
              {uploadLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CameraIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            
            <label className="absolute bottom-0 right-0 p-2 rounded-full cursor-pointer transition-all duration-200 bg-white text-gray-900 hover:bg-opacity-90">
              <CameraIcon className="h-7 w-7" />
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            {profile.avatar && !uploadLoading && (
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                  <p className="text-white text-sm">Change Photo</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left bg-white">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2 bg-white">
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="text-2xl font-bold bg-transparent border-b border-accent focus:outline-none"
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile.name}</h2>
              )}
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full bg-transparent border-b border-accent focus:outline-none resize-none"
                rows="2"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400 bg-white">{profile.bio}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('posts')}
          className={`text-gray-900 px-4 py-2 rounded-full transition-colors ${
            activeTab === 'posts'
              ? 'bg-accent text-gray-900'
              : 'bg-gray-100 dark:bg-gray-700 text-white'
          }`}
        >
          My Posts
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`text-gray-900 px-4 py-2 rounded-full transition-colors ${
            activeTab === 'liked'
              ? 'bg-accent text-gray-900'
              : 'bg-gray-100 dark:bg-gray-700 text-white'
          
          }`}
        >
          Liked Memes
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white"
        >
          {activeTab === 'posts' ? (
            userMemes.length > 0 ? (
              userMemes.map((meme) => (
                <MemeCard key={meme.id} meme={meme} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No posts yet. Start creating some memes!
              </p>
            )
          ) : (
            (() => {
              const likedMemesList = getLikedMemes();
              return likedMemesList.length > 0 ? (
                likedMemesList.map((meme) => (
                  <MemeCard key={meme.id} meme={meme} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No liked memes yet. Start exploring and liking some memes!
                </p>
              );
            })()
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profile;
