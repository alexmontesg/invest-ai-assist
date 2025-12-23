import type { Money } from '@/domain/money';

export interface Order {
  id: string;
  type: OrderType;
  amount: number;
  price: Money;
  asset: string; // TODO: Change to typed asset/security later
  date: string;
}

export type OrderType = 'buy' | 'sell';
