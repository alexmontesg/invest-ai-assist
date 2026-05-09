import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import type { RootState } from '@/store/store';
import type { Order } from '@/orders/types/order';
import { addOrder, removeOrder } from '@/orders/state/orders';

const VISIBILITY_STEP = 5;

export default function useOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [lastVisible, setLastVisible] = useState<number>(VISIBILITY_STEP);

  const visibleOrders = orders.slice(0, lastVisible);

  const handleAdd = (order: Order) => {
    return dispatch(addOrder({ order }));
  };
  const handleRemove = (id: string) => dispatch(removeOrder({ id }));
  const handleIntersection = () => {
    setLastVisible((prev) => Math.min(prev + VISIBILITY_STEP, orders.length));
  };

  return {
    orders: visibleOrders,
    addOrder: handleAdd,
    removeOrder: handleRemove,
    handleIntersection,
  };
}
