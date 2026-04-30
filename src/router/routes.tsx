import type { RouteProps } from 'react-router-dom';

import OrdersView from '@/views/Orders';
import StocksView from '@/views/Stocks';

export default [
  {
    path: '/',
    id: 'orders',
    element: <OrdersView />,
  },
  {
    path: '/stocks',
    id: 'stocks',
    element: <StocksView />,
  },
] as Array<RouteProps & { id: 'string'; path: 'string' }>;
