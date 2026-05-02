import { bootstrap } from '@/store/bootstrap';
import type { AppDispatch } from '@/store/store';

import { watchlistStorage } from '@/watchlist/persistence/storage';
import { hydrateWatchlist } from '@/watchlist/slices/watchlist';

export async function bootstrapWatchlist(dispatch: AppDispatch) {
  return await bootstrap(dispatch, watchlistStorage, hydrateWatchlist);
}
