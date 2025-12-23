import type { Order } from '@/orders/types/order';
import { Money } from '@/domain/money';

const orders: Array<Order> = [
  {
    id: '1',
    type: 'buy',
    amount: 10,
    price: Money.fromUnit(100, 'USD'),
    asset: 'AAPL',
    date: '2023-04-05',
  },
  {
    id: '2',
    type: 'sell',
    amount: 5,
    price: Money.fromUnit(200, 'USD'),
    asset: 'GOOGL',
    date: '2023-04-06',
  },
];

export default orders;
