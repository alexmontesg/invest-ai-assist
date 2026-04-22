import { useTranslation } from 'react-i18next';
import { useState, useTransition } from 'react';
import { Container, Field, Fieldset, Input, Stack } from '@chakra-ui/react';
import { useStock } from '../hooks/useStock';

export default function StocksView() {
  const { t } = useTranslation('translation', { keyPrefix: 'stocks.view' });
  const [query, setQuery] = useState('');
  const [, startTransition] = useTransition();
  const { stock, getStock, clearStock } = useStock({ query });

  const onStockChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const input = evt.target.value;
    startTransition(() => {
      setQuery(input);
    });
    if (!input.length) return clearStock();

    getStock(input);
  };

  return (
    <Container as="main">
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
    </Container>
  );
}
