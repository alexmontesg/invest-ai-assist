import { useCallback, useContext } from 'react';
import { Container, Flex, NativeSelect } from '@chakra-ui/react';

import { CurrencyContext } from '@/context/currency/context';
import Navbar from '@/ui/components/Navbar';

export default function Header() {
  const { allowedCurrencies, updateCurrency } = useContext(CurrencyContext);

  const handleCurrencyChange = useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
      updateCurrency(evt.target.value);
    },
    [updateCurrency],
  );

  return (
    <Container as="header" py="5" mb="3">
      <Flex>
        <Navbar />

        <NativeSelect.Root
          marginInlineStart="auto"
          maxW={{ base: '100%', md: '200px' }}
        >
          <NativeSelect.Field onChange={handleCurrencyChange}>
            {allowedCurrencies.map((currency: string) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
    </Container>
  );
}
