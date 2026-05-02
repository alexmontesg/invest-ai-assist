import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { addAsset, removeAsset } from '@/watchlist/state/watchlist';
import type { RootState } from '@/store/store';

export default function useWatchlist() {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.watchlist.assets);

  const handleRemove = useCallback(
    (asset: string) => dispatch(removeAsset(asset)),
    [dispatch],
  );
  const handleAdd = useCallback(
    (asset: string) => dispatch(addAsset(asset)),
    [dispatch],
  );

  return { assets, handleRemove, handleAdd };
}
