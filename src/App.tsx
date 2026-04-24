import { Provider } from '@/framework/chakra/provider';
import { Separator } from '@chakra-ui/react';

import Header from '@/ui/components/Header';
import OrdersView from '@/orders/components/OrdersView';
import StocksView from '@/stocks/components/StocksView';
import { CurrencyProvider } from '@/context/currency/provider';

function App() {
  return (
    <Provider>
      <CurrencyProvider>
        <Header />
        <OrdersView />
        <Separator mb={8} />
        <StocksView />
      </CurrencyProvider>
    </Provider>
  );
}

export default App;
