import { useTranslation } from 'react-i18next';
import { Container, Grid, GridItem, Heading, VStack } from '@chakra-ui/react';

import OrderForm from '@/orders/components/OrderForm';
import Watchlist from '@/watchlist/components/Watchlist';
import OrderList from '@/orders/components/OrderList';

export default function OrdersView() {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.view' });

  return (
    <Container>
      <Heading as="h1" mb="8">
        {t('title')}
      </Heading>

      <Grid templateColumns="3fr 1fr">
        <GridItem as="main">
          <VStack align="stretch" mb="12">
            <OrderForm />
          </VStack>

          <VStack align="stretch" mb="12">
            <Heading as="h2" mb="4">
              {t('history.title')}
            </Heading>

            <OrderList />
          </VStack>
        </GridItem>

        <GridItem>
          <Watchlist />
        </GridItem>
      </Grid>
    </Container>
  );
}
