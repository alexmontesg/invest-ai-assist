import { useTranslation } from 'react-i18next';
import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react';
import { useCallback } from 'react';

import type { Order as OrderType } from '@/orders/types/order';
import Order from '@/orders/components/Order';

export default function OrdersView({ orders }: { orders?: Array<OrderType> }) {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.view' });
  const hasOrders = useCallback(
    (orders: Array<OrderType> | null | undefined) =>
      Boolean(orders && orders.length > 0),
    [orders],
  );

  return (
    <Container as="main">
      <VStack align="stretch" mb={8}>
        <Heading as="h1">{t('title')}</Heading>

        <Box>
          {hasOrders(orders) ? (
            <Flex direction="column" gap={4}>
              {orders!.map((order) => (
                <Order key={order.id} order={order} />
              ))}
            </Flex>
          ) : (
            <p>{t('empty')}</p>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
