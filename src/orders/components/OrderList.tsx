import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Order from '@/orders/components/Order';
import useOrders from '@/orders/hooks/useOrders';

export default function OrderList() {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.list' });
  const { orders } = useOrders();

  return (
    <Box>
      {orders?.length ? (
        <Flex direction="column" gap={4}>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </Flex>
      ) : (
        <p>{t('empty')}</p>
      )}
    </Box>
  );
}
