import { Routes, Route } from 'react-router-dom';
import { Provider as ChakraProvider } from '@/framework/chakra/provider';
import { Provider as ReduxProvider } from 'react-redux';

import Header from '@/ui/components/Header';
import routes from '@/router/routes';
import { CurrencyProvider } from '@/context/currency/provider';
import Watchlist from '@/watchlist/components/watchlist';
import { store } from '@/store/store';

function App() {
  return (
    <ChakraProvider>
      <ReduxProvider store={store}>
        <CurrencyProvider>
          <Header />
          <Watchlist />
          <Routes>
            {routes.map((r) => (
              <Route key={r.id} {...r} />
            ))}
          </Routes>
        </CurrencyProvider>
      </ReduxProvider>
    </ChakraProvider>
  );
}

export default App;
