import { Container } from '@chakra-ui/react';

import PriceSearch from '@/stocks/components/PriceSearch';

export default function StocksView() {
  return (
    <Container as="main">
      <PriceSearch />
    </Container>
  );
}
