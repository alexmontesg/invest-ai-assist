import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/store/store';
import type { Order } from '@/orders/types/order';
import { addOrder, removeOrder } from '@/orders/state/orders';

export default function useOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const handleAdd = (order: Order) => {
    return dispatch(addOrder({ order }));
  };
  const handleRemove = (id: string) => dispatch(removeOrder({ id }));

  return { orders, addOrder: handleAdd, removeOrder: handleRemove };
}
