import EmptyState from '@/ui/components/EmptyState';
import { AiOutlineStock } from 'react-icons/ai';

export default function EmptyWatchlist() {
  return <EmptyState keyPrefix="watchlist" Icon={AiOutlineStock} />;
}
