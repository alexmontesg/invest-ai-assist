import { useReducer } from 'react';
import type { Order } from '@/orders/types/order';
import { Money } from '@/domain/money';

const ACTION_TYPES = {
  ADD_ORDER: 'ADD_ORDER',
  REMOVE_ORDER: 'REMOVE_ORDER',
};

type OrdersAction =
  | { type: typeof ACTION_TYPES.ADD_ORDER; payload: Order }
  | { type: typeof ACTION_TYPES.REMOVE_ORDER; payload: string };

type ActionHandlers = {
  [K in OrdersAction['type']]: (
    state: Array<Order>,
    payload: unknown,
  ) => Array<Order>;
};

const addOrder = (orders: Array<Order>, order: Order) => {
  return [...orders, order];
};

const removeOrder = (orders: Array<Order>, orderId: string) => {
  return orders.filter((o) => o.id !== orderId);
};

const ACTION_HANDLERS: ActionHandlers = {
  [ACTION_TYPES.ADD_ORDER]: addOrder as ActionHandlers[keyof ActionHandlers],
  [ACTION_TYPES.REMOVE_ORDER]:
    removeOrder as ActionHandlers[keyof ActionHandlers],
};

export interface AddOrderAction {
  payload: Order;
}

export interface DeleteOrderAction {
  payload: string;
}

const ordersReducer = (orders: Array<Order>, action: OrdersAction) => {
  const fn = ACTION_HANDLERS[action.type];
  const newOrders = fn(orders, action.payload as Parameters<typeof fn>[1]);
  localStorage.setItem('orders', JSON.stringify(newOrders));
  return newOrders;
};

const getInitialOrders = () => {
  const itemStr = localStorage.getItem('orders');
  if (!itemStr) return [];
  return JSON.parse(itemStr).map((o: Order) => {
    return {
      ...o,
      price: Money.fromJson(o.price),
    };
  });
};

export default function useOrders() {
  const initialOrders: Array<Order> = getInitialOrders();
  const [state, dispatch] = useReducer(ordersReducer, initialOrders);

  const addOrder = (order: Order) =>
    dispatch({ type: ACTION_TYPES.ADD_ORDER, payload: order });

  const removeOrder = (id: string) =>
    dispatch({ type: ACTION_TYPES.REMOVE_ORDER, payload: id });

  return { orders: state, addOrder, removeOrder };
}
