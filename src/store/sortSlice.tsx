import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SortState {
  sort: string;
  platform: string;
  genre: string;
}

const initialState: SortState = {
  sort: localStorage.getItem('sort') || '',
  platform: localStorage.getItem('platform') || 'all',
  genre: localStorage.getItem('genre') || '',
};

export const sortSlice = createSlice({
  name: 'sortSlice',
  initialState,
  reducers: {
    changeSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      localStorage.setItem('sort', action.payload);
    },
    changePlatform: (state, action: PayloadAction<string>) => {
      state.platform = action.payload;
      localStorage.setItem('platform', action.payload);
    },
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
      localStorage.setItem('genre', action.payload);
    },
  },
});

export const { changeSort, changePlatform, changeGenre } = sortSlice.actions;

export default sortSlice.reducer;
