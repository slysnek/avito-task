import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game, NotFound } from '../types/interfaces';
import { api } from '../api/f2p-games-api';
import { RootState } from './reduxStore';

export const getGameById = createAsyncThunk('games/getGameById', async (id: number, thunkAPI) => {
  console.log(id, 'id in thunk');
  localStorage.setItem('id', JSON.stringify(id));
  const state = thunkAPI.getState() as RootState;
  console.log(state, 'thunk');
  const isSameCard = state.gameInStore.prevId === id;

  if ((isSameCard && Date.now() - state.gameInStore.date! > 5 * 60 * 1000) || !isSameCard) {
    console.log('its more than 5 minutes or new game');
    const response = await api.getGameById(id);
    thunkAPI.dispatch(changePrevId(id));
    localStorage.setItem('prevId', JSON.stringify(id));
    if (response === null) return null;
    return response;
  }
  console.log('same game');
  return null;
});

export interface SavedGameState {
  game: Game | NotFound | null;
  date: number | null;
  id: number | null;
  prevId: number | null;
}

const initialState: SavedGameState = {
  game: (localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')!) : null) || null,
  date: Number(localStorage.getItem('date')) || null,
  id: Number(localStorage.getItem('id')) || null,
  prevId: Number(localStorage.getItem('prevId')) || null,
};

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    changeId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
      console.log(state.id, 'id in state change id');
    },
    changePrevId: (state, action: PayloadAction<number>) => {
      state.prevId = action.payload;
      console.log(state.prevId, 'prev id in state change');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGameById.pending, (state) => {}),
      builder.addCase(getGameById.fulfilled, (state, action) => {
        console.log(action.payload, 'payload');
        if (!(action.payload === null)) {
          state.game = action.payload as Game | NotFound | null;
          console.log(state.game);
          state.date = Date.now();
          localStorage.setItem('game', JSON.stringify(state.game));
          localStorage.setItem('date', JSON.stringify(state.date));
        } else {
          state.game = state.game;
        }
      }),
      builder.addCase(getGameById.rejected, (state) => {});
  },
});

export const { changeId, changePrevId } = gameSlice.actions;

export default gameSlice.reducer;
