import { useContext } from 'react';
import { Flex, NativeSelect } from '@chakra-ui/react';

import { CurrencyContext } from '@/context/currency/context';

export default function Header() {
  const { allowedCurrencies, updateCurrency } = useContext(CurrencyContext);
  const handleCurrencyChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    updateCurrency(evt.target.value);
  };

  return (
    <header>
      <Flex>
        <NativeSelect.Root
          marginInlineStart="auto"
          maxW={{ base: '100%', md: '200px' }}
        >
          <NativeSelect.Field onChange={handleCurrencyChange}>
            {allowedCurrencies.map((currency: string) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            })}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
    </header>
  );
}
