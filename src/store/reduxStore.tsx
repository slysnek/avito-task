import { configureStore } from '@reduxjs/toolkit';
import sortSlice from './sortSlice';
import gameSlice from './gameSlice';

export const store = configureStore({
  reducer: {
    sortInStore: sortSlice,
    gameInStore: gameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
