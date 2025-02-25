import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudArrowUpIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Upload = () => {
  const theme = useSelector((state) => state.theme.theme);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [generating, setGenerating] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileSelect = (file) => {
    if (file && (file.type.startsWith('image/') || file.type === 'image/gif')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image or GIF file');
    }
  };

  const handleGenerateCaption = async () => {
    setGenerating(true);
    try {
      // Simulate API call to generate caption
      await new Promise(resolve => setTimeout(resolve, 1500));
      const suggestedCaptions = [
        "When you finally debug that one error...",
        "Me trying to explain my code at 3 AM",
        "That moment when your code works on the first try",
      ];
      setCaption(suggestedCaptions[Math.floor(Math.random() * suggestedCaptions.length)]);
    } catch (error) {
      console.error('Error generating caption:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      // Simulate upload to Cloudinary
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setCaption('');
      
      // Show success message
      alert('Meme uploaded successfully!');
    } catch (error) {
      console.error('Error uploading meme:', error);
      alert('Error uploading meme. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl shadow-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Upload Your Meme
        </h2>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/10'
              : theme === 'dark'
                ? 'border-gray-600 hover:border-gray-500'
                : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.gif"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            className="hidden"
          />

          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <CloudArrowUpIcon className={`h-12 w-12 mx-auto ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Drag and drop your meme here, or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary hover:underline focus:outline-none"
                  >
                    browse
                  </button>
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Supports: JPG, PNG, GIF (max 10MB)
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-96 mx-auto rounded-lg"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/75"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Caption Input */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption..."
              className={`w-full p-3 rounded-lg border resize-none ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              rows={3}
            />
            <button
              onClick={handleGenerateCaption}
              disabled={generating}
              className={`flex-shrink-0 p-3 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              {generating ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              ) : (
                <SparklesIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !caption}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              selectedFile && caption
                ? 'bg-primary text-white hover:bg-primary/90'
                : theme === 'dark'
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Upload Meme
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
