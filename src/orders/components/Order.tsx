import { useTranslation } from 'react-i18next';
import type { Order } from '@/orders/types/order';

export default function Order({ order }: { order: Order }) {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.order' });
  const total = order.amount * order.price;

  return (
    <article className="Order">
      <header className="Order-header">
        <h2>{t(`title.${order.type}`, { ...order })}</h2>
      </header>
      <section className="Order-details">
        <p>
          {t('amount')}: {order.amount}
        </p>
        <p>
          {t('price')}: {order.price}
        </p>
        <p>
          {t('total')}: {total}
        </p>
      </section>
    </article>
  );
}
