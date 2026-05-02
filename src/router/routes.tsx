import type { RouteProps } from 'react-router-dom';
import { lazy } from 'react';

const OrdersView = lazy(() => import('@/views/Orders'));
const StocksView = lazy(() => import('@/views/Stocks'));

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
] as Array<RouteProps & { id: string; path: string }>;
