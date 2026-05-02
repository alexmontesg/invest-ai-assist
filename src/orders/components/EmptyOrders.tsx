import EmptyState from '@/ui/components/EmptyState';
import { AiOutlineStock } from 'react-icons/ai';

export default function EmptyOrders() {
  return <EmptyState keyPrefix="orders" Icon={AiOutlineStock} />;
}
