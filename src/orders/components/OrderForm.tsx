import { useContext, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Field,
  Fieldset,
  Input,
  RadioCard,
  HStack,
  NumberInput,
  Button,
} from '@chakra-ui/react';

import { Money } from '@/domain/money';
import { CurrencyContext } from '@/context/currency/context';
import type { OrderType } from '@/orders/types/order';
import useOrders from '@/orders/hooks/useOrders';

const orderTypes: Array<OrderType> = ['buy', 'sell'];

export default function OrderForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.form' });
  const { selectedCurrency } = useContext(CurrencyContext);
  const { addOrder } = useOrders();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget as HTMLFormElement);
    const values = Object.fromEntries(formData.entries());
    addOrder({
      id: crypto.randomUUID(),
      type: values.type as OrderType,
      amount: Number(values.amount),
      asset: String(values.asset),
      price: Money.fromUnit(100, selectedCurrency).toJSON(), // TODO check actual price
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
