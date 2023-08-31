import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game, NotFound, SavedGameState } from '../types/interfaces';
import { api } from '../api/f2p-games-api';
import { RootState } from './reduxStore';

export const getGameById = createAsyncThunk('games/getGameById', async (id: number, thunkAPI) => {
  localStorage.setItem('id', JSON.stringify(id));
  const state = thunkAPI.getState() as RootState;
  const isSameCard = state.gameInStore.prevId === id;

  if ((isSameCard && Date.now() - state.gameInStore.date! > 5 * 60 * 1000) || !isSameCard) {
    const response = await api.getGameById(id);
    thunkAPI.dispatch(changePrevId(id));
    thunkAPI.dispatch(changePrevGame(response));
    localStorage.setItem('prevId', JSON.stringify(id));
    if (response === null) return null;
    return response;
  }
  return null;
});

const initialState: SavedGameState = {
  game: (localStorage.getItem('game') ? JSON.parse(localStorage.getItem('game')!) : null) || null,
  prevGame:
    (localStorage.getItem('prevGame') ? JSON.parse(localStorage.getItem('prevGame')!) : null) ||
    null,
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
    },
    changePrevId: (state, action: PayloadAction<number>) => {
      state.prevId = action.payload;
    },
    changePrevGame: (state, action: PayloadAction<Game | NotFound>) => {
      state.prevGame = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGameById.pending, (state) => {
      state.game = null;
    }),
      builder.addCase(getGameById.fulfilled, (state, action) => {
        if (!(action.payload === null)) {
          state.game = action.payload as Game | NotFound | null;
          state.date = Date.now();
          localStorage.setItem('game', JSON.stringify(state.game));
          localStorage.setItem('date', JSON.stringify(state.date));
        } else {
          state.game = state.prevGame;
        }
      }),
      builder.addCase(getGameById.rejected, (state) => {
        state.game = {
          status: 0,
          status_message: 'Rejected',
        };
      });
  },
});

export const { changeId, changePrevId, changePrevGame } = gameSlice.actions;

export default gameSlice.reducer;
