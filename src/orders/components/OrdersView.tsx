import { useTranslation } from 'react-i18next';
import type { Order as OrderType } from '@/orders/types/order';
import Order from '@/orders/components/Order';

function hasOrders(orders: Array<OrderType> | null | undefined): boolean {
  return Boolean(orders && orders.length > 0);
}

export default function OrdersView({ orders }: { orders?: Array<OrderType> }) {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.view' });

  return (
    <main className="Orders">
      <header className="Orders-header">
        <h1>{t('title')}</h1>
      </header>
      <section className="Orders-content">
        {hasOrders(orders) &&
          orders!.map((order) => <Order key={order.id} order={order} />)}

        {!hasOrders(orders) && <p>{t('empty')}</p>}
      </section>
    </main>
  );
}
