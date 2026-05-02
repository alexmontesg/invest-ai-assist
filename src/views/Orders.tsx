import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
} from '@chakra-ui/react';

import Order from '@/orders/components/Order';
import OrderForm from '@/orders/components/OrderForm';
import useOrders from '@/orders/hooks/useOrders';
import Watchlist from '@/watchlist/components/Watchlist';

export default function OrdersView() {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.view' });
  const { orders, addOrder } = useOrders();

  return (
    <Container>
      <Heading as="h1" mb="8">
        {t('title')}
      </Heading>

      <Grid templateColumns="3fr 1fr">
        <GridItem as="main">
          <VStack align="stretch" mb="12">
            <OrderForm addOrder={addOrder} />
          </VStack>

          <VStack align="stretch" mb="12">
            <Heading as="h2" mb="4">
              {t('history.title')}
            </Heading>
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
        </GridItem>

        <GridItem>
          <Watchlist />
        </GridItem>
      </Grid>
    </Container>
  );
}
