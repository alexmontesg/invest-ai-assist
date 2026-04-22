import { useTranslation } from 'react-i18next';
import { Box, Container, Flex, Heading, VStack } from '@chakra-ui/react';

import type { Order as OrderType } from '@/orders/types/order';
import Order from '@/orders/components/Order';

export default function OrdersView({ orders }: { orders?: Array<OrderType> }) {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.view' });

  return (
    <Container as="main">
      <VStack align="stretch" mb={8}>
        <Heading as="h1">{t('title')}</Heading>

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
      </VStack>
    </Container>
  );
}
