import { Routes, Route } from 'react-router-dom';
import { Provider } from '@/framework/chakra/provider';

import Header from '@/ui/components/Header';
import routes from '@/router/routes';
import { CurrencyProvider } from '@/context/currency/provider';

function App() {
  return (
    <Provider>
      <CurrencyProvider>
        <Header />
        <Routes>
          {routes.map((r) => (
            <Route key={r.path} {...r} />
          ))}
        </Routes>
      </CurrencyProvider>
    </Provider>
  );
}

export default App;
