import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Container, Field, Fieldset, Input, Stack } from '@chakra-ui/react';
import { useStock } from '../hooks/useStock';

export default function StocksView() {
  const { t } = useTranslation('translation', { keyPrefix: 'stocks.view' });
  const [query, setQuery] = useState('');
  const { stock, getStock, clearStock } = useStock();

  const onStockChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const input = evt.target.value;
    setQuery(input);
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

      {stock && (
        <p>{t('stock.price', { price: stock.price, ticker: stock.asset })}</p>
      )}
    </Container>
  );
}
