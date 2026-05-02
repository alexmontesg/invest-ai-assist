import type { Middleware, UnknownAction } from '@reduxjs/toolkit';

import { watchlistStorage } from '@/watchlist/persistence/storage';

export const watchlistPersistenceMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const result = next(action);

    if (!(action as UnknownAction).type.startsWith('watchlist/')) {
      return result;
    }

    const state = store.getState();
    const watchlist = state.watchlist.assets;

    await watchlistStorage.save(watchlist);
    return result;
  };
