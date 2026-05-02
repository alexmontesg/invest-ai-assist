import { Box, Flex } from '@chakra-ui/react';

import Order from '@/orders/components/Order';
import EmptyOrders from '@/orders/components/EmptyOrders';
import useOrders from '@/orders/hooks/useOrders';

export default function OrderList() {
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
        <EmptyOrders />
      )}
    </Box>
  );
}
