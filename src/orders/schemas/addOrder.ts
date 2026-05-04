import { z } from 'zod';

import type { OrderType } from '@/orders/types/order';
import type { TFunction } from 'i18next';
const orderTypes: Array<OrderType> = ['buy', 'sell'];

export function getFormSchema({ t }: { t: TFunction }) {
  return z.object({
    type: z.enum(orderTypes, {
      error: t('type.invalid'),
    }),
    amount: z.number({ error: t('amount.invalid') }).min(1, t('amount.min')),
    asset: z.string().min(1, { message: 'asset.required' }),
  });
}

export function getDefaultValues() {
  return {
    type: orderTypes[0],
    amount: 0,
    asset: '',
  };
}
