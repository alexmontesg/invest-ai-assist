import OrdersView from '@/orders/components/OrdersView';
import orders from '@/orders/mocks/orders';

function App() {
  return (
    <>
      <OrdersView orders={orders} />
    </>
  );
}

export default App;
