import type { AppDispatch } from '@/store/store';

import { ordersStorage } from '@/orders/persistence/storage';
import { hydrateOrders } from '@/orders/state/orders';
import { bootstrap } from '@/store/bootstrap';

export async function bootstrapOrders(dispatch: AppDispatch) {
  return await bootstrap(dispatch, ordersStorage, hydrateOrders);
}
