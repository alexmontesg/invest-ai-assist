import type { RouteProps } from 'react-router-dom';
import { lazy } from 'react';

const OrdersView = lazy(() => import('@/views/Orders'));
const StocksView = lazy(() => import('@/views/Stocks'));
const UserView = lazy(() => import('@/views/User'));

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
  {
    path: '/user',
    id: 'user',
    element: <UserView />,
  },
] as Array<RouteProps & { id: string; path: string }>;
