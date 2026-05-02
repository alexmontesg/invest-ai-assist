import { configureStore } from '@reduxjs/toolkit';

import watchlistReducer from '@/watchlist/state/watchlist';
import { watchlistPersistenceMiddleware } from '@/watchlist/state/middleware';

import ordersReducer from '@/orders/state/orders';
import { ordersPersistenceMiddleware } from '@/orders/state/middleware';

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
