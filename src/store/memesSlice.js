import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMemes = createAsyncThunk(
  'memes/fetchMemes',
  async () => {
    const response = await axios.get('https://api.imgflip.com/get_memes');
    return response.data.data.memes;
  }
);

const initialState = {
  memes: [],
  userMemes: JSON.parse(localStorage.getItem('userMemes') || '[]'),
  likedMemes: JSON.parse(localStorage.getItem('likedMemes') || '[]'),
  status: 'idle',
  error: null,
};

export const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {
    likeMeme: (state, action) => {
      const memeId = action.payload;
      if (!state.likedMemes.includes(memeId)) {
        state.likedMemes.push(memeId);
        localStorage.setItem('likedMemes', JSON.stringify(state.likedMemes));
      }
    },
    unlikeMeme: (state, action) => {
      const memeId = action.payload;
      state.likedMemes = state.likedMemes.filter(id => id !== memeId);
      localStorage.setItem('likedMemes', JSON.stringify(state.likedMemes));
    },
    addUserMeme: (state, action) => {
      state.userMemes.unshift(action.payload);
      localStorage.setItem('userMemes', JSON.stringify(state.userMemes));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.memes = action.payload;
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { likeMeme, unlikeMeme, addUserMeme } = memesSlice.actions;

export default memesSlice.reducer;
