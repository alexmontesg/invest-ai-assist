import { bootstrap } from '@/store/bootstrap';

import { watchlistStorage } from '@/watchlist/persistence/storage';
import { hydrateWatchlist } from '@/watchlist/state/watchlist';
import { store } from '@/store/store';

export async function bootstrapWatchlist() {
  return await bootstrap(store.dispatch, watchlistStorage, hydrateWatchlist);
}
