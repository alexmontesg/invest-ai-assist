import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { CurrencyProvider } from '@/context/currency/provider';

import ordersReducer from '@/orders/state/orders';
import type { Order } from '@/orders/types/order';

export function createWrapper(preloadedState?: {
  orders: { orders: Order[] };
}) {
  const store = configureStore({
    reducer: {
      orders: ordersReducer,
    },
    preloadedState,
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <CurrencyProvider>{children}</CurrencyProvider>
      </ChakraProvider>
    </Provider>
  );

  return Wrapper;
}

export function renderWithStore(
  _ui: ReactNode,
  preloadedState?: { orders: { orders: Order[] } },
) {
  const store = configureStore({
    reducer: {
      orders: ordersReducer,
    },
    preloadedState,
  });

  return {
    store,
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        <ChakraProvider value={defaultSystem}>
          <CurrencyProvider>{children}</CurrencyProvider>
        </ChakraProvider>
      </Provider>
    ),
  };
}
