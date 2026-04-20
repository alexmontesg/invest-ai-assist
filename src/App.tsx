import { Provider } from '@/framework/chakra/provider';

import OrdersView from '@/orders/components/OrdersView';
import orders from '@/orders/mocks/orders';
import StocksView from '@/stocks/components/StocksView';

function App() {
  return (
    <Provider>
      <OrdersView orders={orders} />
      <StocksView />
    </Provider>
  );
}

export default App;
