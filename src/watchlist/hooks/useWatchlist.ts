import { useDispatch, useSelector } from 'react-redux';

import { addAsset, removeAsset } from '@/watchlist/state/watchlist';
import type { RootState } from '@/store/store';

export default function useWatchlist() {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.watchlist.assets);

  const handleRemove = (asset: string) => dispatch(removeAsset(asset));
  const handleAdd = (asset: string) => dispatch(addAsset(asset));

  return { assets, handleRemove, handleAdd };
}
