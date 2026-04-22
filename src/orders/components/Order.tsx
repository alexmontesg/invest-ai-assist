import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, DataList, LocaleProvider } from '@chakra-ui/react';

import type { Money } from '@/domain/money';
import type { Order } from '@/orders/types/order';
import OrderFieldValue from '@/orders/components/OrderFieldValue';
import { useOrder } from '@/orders/hooks/useOrder';

function OrderRow({
  label,
  value,
  style,
  locale,
}: {
  label: string;
  value: number | Money;
  style: 'number' | 'currency';
  locale: string;
}) {
  return (
    <DataList.Item>
      <DataList.ItemLabel>{label}</DataList.ItemLabel>
      <DataList.ItemValue>
        <LocaleProvider locale={locale}>
          <OrderFieldValue value={value} style={style} />
        </LocaleProvider>
      </DataList.ItemValue>
    </DataList.Item>
  );
}

const OrderRowMemo = memo(OrderRow);

function Order({ order }: { order: Order }) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'orders.order',
  });
  const { orderData } = useOrder({ order });

  const locale = i18n.language;

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{t(`title.${order.type}`, { ...order })}</Card.Title>
      </Card.Header>
      <Card.Body>
        <DataList.Root orientation="horizontal">
          {orderData.map(({ key, value, style }) => (
            <OrderRowMemo
              key={key}
              label={key}
              value={value}
              style={style}
              locale={locale}
            />
          ))}
        </DataList.Root>
      </Card.Body>
    </Card.Root>
  );
}

export default memo(Order);
