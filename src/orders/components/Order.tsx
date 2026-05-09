import { memo, useContext, type RefAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, DataList, LocaleProvider } from '@chakra-ui/react';
import { CiTrash, CiRepeat } from 'react-icons/ci';
import { useSelector } from 'react-redux';

import { Money, type SerializedMoney } from '@/domain/money';
import { isOnWatchlistSelector } from '@/watchlist/state/selector';
import type { Order } from '@/orders/types/order';
import OrderFieldValue from '@/orders/components/OrderFieldValue';
import FavouriteMarker from '@/orders/components/FavouriteMarker';
import { useOrder } from '@/orders/hooks/useOrder';
import useOrders from '@/orders/hooks/useOrders';
import { CurrencyContext } from '@/context/currency/context';

function OrderRow({
  label,
  value,
  style,
  locale,
}: {
  label: string;
  value: number | SerializedMoney;
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

type OrderProps = RefAttributes<HTMLDivElement> & {
  order: Order;
};

function Order({ order, ref }: OrderProps) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'orders.order',
  });
  const { selectedCurrency } = useContext(CurrencyContext);
  const { orderData } = useOrder({ order });
  const { addOrder, removeOrder } = useOrders();
  const isOnWatchlist = useSelector(isOnWatchlistSelector(order.asset));

  const repeatOrder = () => {
    addOrder({
      ...order,
      id: crypto.randomUUID(),
      price: Money.fromUnit(100, selectedCurrency).toJSON(), // TODO check actual price
      date: new Date().toISOString(),
    });
  };

  return (
    <Card.Root ref={ref}>
      <Card.Header>
        {isOnWatchlist ? <FavouriteMarker /> : null}
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
              locale={i18n.language}
            />
          ))}
        </DataList.Root>
      </Card.Body>

      <Card.Footer justifyContent="end" gap="4">
        <Button
          variant="subtle"
          colorPalette="green"
          flex="1"
          maxW="48"
          onClick={repeatOrder}
        >
          <CiRepeat />
          Repeat
        </Button>
        <Button
          variant="subtle"
          colorPalette="red"
          flex="1"
          maxW="48"
          onClick={() => removeOrder(order.id)}
        >
          <CiTrash />
          Remove
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default memo(Order);
