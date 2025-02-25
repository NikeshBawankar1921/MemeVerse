import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    return theme;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return 'light';
  }
};

const initialState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      try {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        state.theme = newTheme;
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      } catch (error) {
        console.error('Error toggling theme:', error);
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
