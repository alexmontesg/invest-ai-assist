import type { SerializedMoney } from '@/domain/money';

export interface Order {
  id: string;
  type: OrderType;
  amount: number;
  price: SerializedMoney;
  asset: string; // TODO: Change to typed asset/security later
  date: string;
}

export type OrderType = 'buy' | 'sell';
