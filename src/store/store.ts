import { configureStore } from '@reduxjs/toolkit';

import watchlistReducer from '@/watchlist/slices/watchlist';
import { watchlistPersistenceMiddleware } from '@/watchlist/slices/middleware';

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(watchlistPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
