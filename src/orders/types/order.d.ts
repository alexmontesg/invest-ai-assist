export interface Order {
  id: string;
  type: OrderType;
  amount: number;
  price: number; // TODO: Change to typed money later
  asset: string; // TODO: Change to typed asset/security later
  date: string;
}

export type OrderType = 'buy' | 'sell';
