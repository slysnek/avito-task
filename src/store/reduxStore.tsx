import { configureStore } from '@reduxjs/toolkit';
import sortSlice from './sortSlice';

export const store = configureStore({
  reducer: {
    sortInStore: sortSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
