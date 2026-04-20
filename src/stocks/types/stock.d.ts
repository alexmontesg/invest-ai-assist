import type { Money } from '@/domain/money';

export interface Stock {
  id: string;
  price: Money;
  asset: string; // TODO: Change to typed asset/security later
}
