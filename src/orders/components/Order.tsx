import { useTranslation } from 'react-i18next';
import { Card, DataList, LocaleProvider } from '@chakra-ui/react';

import type { Order } from '@/orders/types/order';
import OrderFieldValue from '@/orders/components/OrderFieldValue';
import { useOrder } from '@/orders/hooks/useOrder';

export default function Order({ order }: { order: Order }) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'orders.order',
  });
  const { orderData } = useOrder({ order });

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{t(`title.${order.type}`, { ...order })}</Card.Title>
      </Card.Header>
      <Card.Body>
        <DataList.Root orientation="horizontal">
          {orderData.map(({ key, value, style }) => (
            <DataList.Item key={key}>
              <DataList.ItemLabel>{t(key)}</DataList.ItemLabel>
              <DataList.ItemValue>
                <LocaleProvider locale={i18n.language}>
                  <OrderFieldValue value={value} style={style} />
                </LocaleProvider>
              </DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Card.Body>
    </Card.Root>
  );
}
