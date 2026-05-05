import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import watchlistReducer from '@/watchlist/state/watchlist';
import { render } from '@testing-library/react';

export function createWrapper() {
  const store = configureStore({
    reducer: {
      watchlist: watchlistReducer,
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return Wrapper;
}

export function renderWithStore(
  ui: ReactNode,
  preloadedState?: { watchlist: { assets: string[] } },
) {
  const store = configureStore({
    reducer: {
      watchlist: watchlistReducer,
    },
    preloadedState,
  });

  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
      </Provider>
    ),
  });
}
