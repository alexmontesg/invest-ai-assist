import type { RootState } from '@/store/store';

export const selectAssets = (state: RootState) => state.watchlist.assets;

export const isOnWatchlistSelector = (asset: string) => (state: RootState) =>
  state.watchlist.assets.includes(asset);
