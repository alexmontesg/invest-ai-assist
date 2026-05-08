import type { SerializedMoney } from '@/domain/money';

export interface DebtItem {
  id: string;
  givenName: string;
  total: SerializedMoney;
  outstanding: SerializedMoney;
  interestRate: number;
  totalTerm: number;
  remainingTerm: number;
}

export interface UserDebt {
  items: Array<DebtItem>;
}
