import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { addUserMeme } from '../store/memesSlice';

const Upload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
      setSelectedFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file (JPEG, PNG, or GIF)');
    }
  };

  const generateCaption = async () => {
    if (!selectedFile) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI caption generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCaption('AI generated caption for your meme! 😎');
    } catch (error) {
      setError('Failed to generate caption. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const uploadMeme = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Upload to ImgBB
      const response = await fetch('https://api.imgbb.com/1/upload?key=703866954a55bad4f8f116a4dd0734fe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const newMeme = {
          id: Date.now().toString(),
          url: data.data.url,
          name: caption || 'My awesome meme',
          width: data.data.width,
          height: data.data.height,
          box_count: 0,
        };

        dispatch(addUserMeme(newMeme));
        navigate('/profile');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setError('Failed to upload meme. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
      setSelectedFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please drop a valid image file (JPEG, PNG, or GIF)');
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-secondary rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Upload Your Meme</h2>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center ${
            preview ? 'border-accent' : 'border-gray-300 dark:border-gray-700'
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-96 mx-auto rounded-lg"
              />
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreview('');
                }}
                className="text-red-500 hover:text-red-600"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <CloudArrowUpIcon className="h-16 w-16 mx-auto text-gray-400" />
              <div className="space-y-2">
                <p className="text-lg">Drag and drop your meme here</p>
                <p className="text-sm text-gray-500">or</p>
                <label className="btn btn-primary cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  Choose File
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Caption Input */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                Add a caption
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write something funny..."
                  className="flex-1 rounded-lg border dark:border-gray-700 dark:bg-gray-800 px-4 py-2"
                />
                <button
                  onClick={generateCaption}
                  disabled={isGenerating}
                  className="btn btn-primary"
                >
                  {isGenerating ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
            </div>

            <button
              onClick={uploadMeme}
              disabled={isUploading}
              className="w-full btn btn-primary"
            >
              {isUploading ? 'Uploading...' : 'Upload Meme'}
            </button>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-red-500 text-center"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Upload;
