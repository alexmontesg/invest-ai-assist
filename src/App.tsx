import { Provider } from '@/framework/chakra/provider';

import Header from '@/ui/components/Header';
import OrdersView from '@/orders/components/OrdersView';
import orders from '@/orders/mocks/orders';
import StocksView from '@/stocks/components/StocksView';
import { CurrencyProvider } from '@/context/currency/provider';

function App() {
  return (
    <Provider>
      <CurrencyProvider>
        <Header />
        <OrdersView orders={orders} />
        <StocksView />
      </CurrencyProvider>
    </Provider>
  );
}

export default App;
