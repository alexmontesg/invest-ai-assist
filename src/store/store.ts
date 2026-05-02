import { configureStore } from '@reduxjs/toolkit';

import watchlistReducer from '@/watchlist/slices/watchlist';
import { watchlistPersistenceMiddleware } from '@/watchlist/slices/middleware';

import ordersReducer from '@/orders/slices/orders';
import { ordersPersistenceMiddleware } from '@/orders/slices/middleware';

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    orders: ordersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      watchlistPersistenceMiddleware,
      ordersPersistenceMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
