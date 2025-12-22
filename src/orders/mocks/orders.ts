import type { Order } from '@/orders/types/order';

const orders: Array<Order> = [
  {
    id: '1',
    type: 'buy',
    amount: 10,
    price: 100,
    asset: 'AAPL',
    date: '2023-04-05',
  },
  {
    id: '2',
    type: 'sell',
    amount: 5,
    price: 200,
    asset: 'GOOGL',
    date: '2023-04-06',
  },
];

export default orders;
