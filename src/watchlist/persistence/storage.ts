import { StorageFactory } from '@/persistence/factory';

export const watchlistStorage = StorageFactory.create<string[], 'local'>(
  'local',
  {
    key: 'watchlist',
  },
);
