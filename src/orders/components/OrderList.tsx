import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import Order from '@/orders/components/Order';
import EmptyOrders from '@/orders/components/EmptyOrders';
import OrdersSkeleton from '@/orders/components/OrdersSkeleton';
import useOrders from '@/orders/hooks/useOrders';
import { bootstrapOrders } from '@/orders/state/bootstrap';

function OrderListContents({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return <OrdersSkeleton />;
  }

  const { orders } = useOrders();

  if (!orders?.length) {
    return <EmptyOrders />;
  }

  return (
    <Flex direction="column" gap={4}>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </Flex>
  );
}

export default function OrderList() {
  const { isLoading } = useQuery({
    queryKey: ['order_list'],
    queryFn: bootstrapOrders,
  });

  return (
    <Box aria-busy={isLoading} aria-label="orders">
      <OrderListContents isLoading={isLoading} />
    </Box>
  );
}
