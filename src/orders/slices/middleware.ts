import type { Middleware, UnknownAction } from '@reduxjs/toolkit';

import { ordersStorage } from '@/orders/persistence/storage';

export const ordersPersistenceMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const result = next(action);

    if (!(action as UnknownAction).type.startsWith('orders/')) {
      return result;
    }

    const state = store.getState();
    const orders = state.orders.orders;

    await ordersStorage.save(orders);
    return result;
  };
