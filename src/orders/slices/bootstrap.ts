import type { AppDispatch } from '@/store/store';

import { ordersStorage } from '@/orders/persistence/storage';
import { hydrateOrders } from '@/orders/slices/orders';
import { bootstrap } from '@/store/bootstrap';

export async function bootstrapOrders(dispatch: AppDispatch) {
  return await bootstrap(dispatch, ordersStorage, hydrateOrders);
}
