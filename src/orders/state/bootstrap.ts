import { ordersStorage } from '@/orders/persistence/storage';
import { hydrateOrders } from '@/orders/state/orders';
import { bootstrap } from '@/store/bootstrap';
import { store } from '@/store/store';

export async function bootstrapOrders() {
  return await bootstrap(store.dispatch, ordersStorage, hydrateOrders);
}
