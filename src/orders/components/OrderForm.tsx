import { useTranslation } from 'react-i18next';
import type React from 'react';
import {
  Field,
  Fieldset,
  Input,
  RadioCard,
  HStack,
  NumberInput,
  Button,
} from '@chakra-ui/react';
import type { OrderType, Order } from '@/orders/types/order';
import { Money } from '@/domain/money';
import { useContext } from 'react';
import { CurrencyContext } from '@/context/currency/context';

const orderTypes: Array<OrderType> = ['buy', 'sell'];

export default function OrderForm({
  addOrder,
}: {
  addOrder: (order: Order) => void;
}) {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.form' });
  const { selectedCurrency } = useContext(CurrencyContext);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    addOrder({
      id: crypto.randomUUID(),
      type: values.type as OrderType,
      amount: Number(values.amount),
      asset: String(values.asset),
      price: Money.fromUnit(100, selectedCurrency), // TODO check actual price
      date: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root>
        <Fieldset.Legend>{t('title')}</Fieldset.Legend>
        <Fieldset.Content>
          <RadioCard.Root defaultValue={orderTypes[0]} name="type">
            <RadioCard.Label>{t('type.label')}</RadioCard.Label>
            <HStack align="stretch">
              {orderTypes.map((item) => (
                <RadioCard.Item key={item} value={item}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemText>{t(`type.${item}`)}</RadioCard.ItemText>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </HStack>
          </RadioCard.Root>

          <Field.Root>
            <Field.Label>{t('asset')}</Field.Label>
            <Input name="asset" />
          </Field.Root>

          <Field.Root>
            <Field.Label>{t('amount')}</Field.Label>
            <NumberInput.Root min={0} name="amount">
              <NumberInput.Control />
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start">
          {t('submit')}
        </Button>
      </Fieldset.Root>
    </form>
  );
}
