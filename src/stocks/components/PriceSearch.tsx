import { useTranslation } from 'react-i18next';
import { useState, useTransition } from 'react';
import { Alert, Field, Fieldset, Input, Stack, VStack } from '@chakra-ui/react';

import { useStock } from '@/stocks/hooks/useStock';

export default function PriceSearch() {
  const { t } = useTranslation('translation', { keyPrefix: 'stocks.view' });
  const [query, setQuery] = useState('');
  const [, startTransition] = useTransition();
  const { stock, error, clearStock, clearError } = useStock({ query });

  const onStockChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const input = evt.target.value;
    startTransition(() => {
      clearError();
      setQuery(input);
    });
    if (!input.length) return clearStock();
  };

  return (
    <VStack gap="8">
      {error ? (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Title>{t(error, { ticker: query })}</Alert.Title>
        </Alert.Root>
      ) : null}
      <Fieldset.Root>
        <Stack>
          <Fieldset.Legend>{t('form.title')}</Fieldset.Legend>
          <Fieldset.HelperText>{t('form.subtitle')}</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>{t('form.stock.label')}</Field.Label>
            <Input
              value={query}
              name="stock"
              placeholder="AAPL, MSFT..."
              onChange={onStockChange}
            />
          </Field.Root>
        </Fieldset.Content>
      </Fieldset.Root>

      {stock ? (
        <p>{t('stock.price', { price: stock.price, ticker: stock.asset })}</p>
      ) : null}
    </VStack>
  );
}
