import { Provider } from '@/framework/chakra/provider';

import OrdersView from '@/orders/components/OrdersView';
import orders from '@/orders/mocks/orders';

function App() {
  return (
    <Provider>
      <OrdersView orders={orders} />
    </Provider>
  );
}

export default App;
