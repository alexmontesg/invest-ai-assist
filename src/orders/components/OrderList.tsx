import { useEffect, useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import Order from '@/orders/components/Order';
import EmptyOrders from '@/orders/components/EmptyOrders';
import OrdersSkeleton from '@/orders/components/OrdersSkeleton';
import useOrders from '@/orders/hooks/useOrders';
import { bootstrapOrders } from '@/orders/state/bootstrap';

function OrderListContents({ isLoading }: { isLoading: boolean }) {
  const sentinel = useRef<HTMLDivElement | null>(null);

  const { orders, handleIntersection } = useOrders();
  const handleIntersectionRef = useRef(handleIntersection);
  handleIntersectionRef.current = handleIntersection;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleIntersectionRef.current();
      }
    });

    if (sentinel.current) {
      observer.observe(sentinel.current);
    }

    return () => observer.disconnect();
  }, [orders]);

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  if (!orders?.length) {
    return <EmptyOrders />;
  }

  return (
    <Flex direction="column" gap={4}>
      {orders.map((order, idx) => (
        <Order
          key={order.id}
          order={order}
          ref={idx === orders.length - 1 ? sentinel : null}
        />
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
