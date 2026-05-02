import { createSlice } from '@reduxjs/toolkit';
import type { Order } from '@/orders/types/order';

const initialState = {
  orders: [] as Array<Order>,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload.order);
    },

    removeOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload.id);
    },

    hydrateOrders: (state, action) => {
      state.orders = action.payload.filter(Boolean);
    },
  },
});

export const { addOrder, removeOrder, hydrateOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
