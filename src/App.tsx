import { Routes, Route } from 'react-router-dom';
import { Provider } from '@/framework/chakra/provider';

import Header from '@/ui/components/Header';
import OrdersView from '@views/Orders';
import StocksView from '@views/Stocks';
import { CurrencyProvider } from '@/context/currency/provider';

function App() {
  return (
    <Provider>
      <CurrencyProvider>
        <Header />
        <Routes>
          <Route path="/" element={<OrdersView />} />
          <Route path="/stocks" element={<StocksView />} />
        </Routes>
      </CurrencyProvider>
    </Provider>
  );
}

export default App;
