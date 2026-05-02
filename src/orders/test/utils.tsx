import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { CurrencyProvider } from '@/context/currency/provider';
import { render as tlRender, type RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ordersReducer from '@/orders/state/orders';
import watchlistReducer from '@/watchlist/state/watchlist';
import type { Order } from '@/orders/types/order';

// Define state types
export interface OrdersState {
  orders: Order[];
}

export interface WatchlistState {
  assets: string[];
}

export interface TestStoreState {
  orders: OrdersState;
  watchlist: WatchlistState;
}

// Create typed combined reducer
const rootReducer = combineReducers({
  orders: ordersReducer,
  watchlist: watchlistReducer,
});

type Store = ReturnType<typeof rootReducer>;

// Default initial states
const initialOrdersState: OrdersState = { orders: [] };
const initialWatchlistState: WatchlistState = { assets: [] };

export interface RenderWithProvidersOptions {
  preloadedState?: Partial<TestStoreState>;
}

export interface RenderWithProvidersResult extends RenderResult {
  store: ReturnType<typeof configureStore>;
  user: ReturnType<typeof userEvent.setup>;
}

export function renderWithProviders(
  ui: ReactNode,
  options?: RenderWithProvidersOptions,
): RenderWithProvidersResult {
  const { preloadedState } = options || {};

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      orders: preloadedState?.orders ?? initialOrdersState,
      watchlist: preloadedState?.watchlist ?? initialWatchlistState,
    } as Store,
  });

  const user = userEvent.setup();

  const renderResult = tlRender(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        <ChakraProvider value={defaultSystem}>
          <CurrencyProvider>{children}</CurrencyProvider>
        </ChakraProvider>
      </Provider>
    ),
  });

  return {
    ...renderResult,
    store,
    user,
  };
}
