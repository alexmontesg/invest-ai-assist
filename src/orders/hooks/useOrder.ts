import { useMemo } from 'react';

import { Money, type SerializedMoney } from '@/domain/money';
import type { Order } from '@/orders/types/order';

type NumberField = { key: string; value: number; style: 'number' };
type CurrencyField = { key: string; value: SerializedMoney; style: 'currency' };
type Field = NumberField | CurrencyField;

export function useOrder({ order }: { order: Order }) {
  const orderData = useMemo<Array<Field>>(
    () => [
      { key: 'amount', value: order.amount, style: 'number' },
      { key: 'price', value: order.price, style: 'currency' },
      {
        key: 'total',
        value: Money.fromJson(order.price).multiply(order.amount).toJSON(),
        style: 'currency',
      },
    ],
    [order.price, order.amount],
  );

  return { orderData };
}
