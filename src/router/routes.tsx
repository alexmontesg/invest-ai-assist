import type { RouteProps } from 'react-router-dom';

import OrdersView from '@/views/Orders';
import StocksView from '@/views/Stocks';

export default [
  {
    path: '/',
    element: <OrdersView />,
  },
  {
    path: '/stocks',
    element: <StocksView />,
  },
] as Array<RouteProps>;
