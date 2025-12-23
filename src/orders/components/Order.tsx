import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, DataList, LocaleProvider } from '@chakra-ui/react';

import type { Order } from '@/orders/types/order';
import type { Money } from '@/domain/money';
import OrderFieldValue from '@/orders/components/OrderFieldValue';

type NumberField = { key: string; value: number; style: 'number' };
type CurrencyField = { key: string; value: Money; style: 'currency' };
type Field = NumberField | CurrencyField;

export default function Order({ order }: { order: Order }) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'orders.order',
  });
  const totalMoney = useMemo(
    () => order.price.multiply(order.amount),
    [order.price, order.amount],
  );

  const orderData: Array<Field> = [
    { key: 'amount', value: order.amount, style: 'number' },
    { key: 'price', value: order.price, style: 'currency' },
    { key: 'total', value: totalMoney, style: 'currency' },
  ];

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
