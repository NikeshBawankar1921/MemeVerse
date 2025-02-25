import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Explorer from './pages/Explorer';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import MemeDetails from './pages/MemeDetails';

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explorer />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/meme/:id" element={<MemeDetails />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
