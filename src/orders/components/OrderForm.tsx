import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@tanstack/react-form';
import {
  Field,
  Fieldset,
  Input,
  RadioCard,
  HStack,
  NumberInput,
  Button,
  Grid,
} from '@chakra-ui/react';

import { Money } from '@/domain/money';
import { CurrencyContext } from '@/context/currency/context';
import type { OrderType } from '@/orders/types/order';
import useOrders from '@/orders/hooks/useOrders';
import { getDefaultValues, getFormSchema } from '@/orders/schemas/addOrder';

export default function OrderForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'orders.form' });
  const { t: errorsT } = useTranslation('translation', {
    keyPrefix: 'orders.form.errors',
  });
  const { selectedCurrency } = useContext(CurrencyContext);
  const { addOrder } = useOrders();
  const schema = getFormSchema({ t: errorsT });

  const form = useForm({
    defaultValues: getDefaultValues(),
    onSubmit: async ({ value }) => {
      addOrder({
        id: crypto.randomUUID(),
        type: value.type as OrderType,
        amount: Number(value.amount),
        asset: String(value.asset),
        price: Money.fromUnit(100, selectedCurrency).toJSON(), // TODO check actual price
        date: new Date().toISOString(),
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Fieldset.Root>
        <Fieldset.Legend>{t('title')}</Fieldset.Legend>
        <Fieldset.Content mb="6">
          <Grid templateColumns={{ base: '1f', md: '1fr 1fr' }} gap="6">
            <form.Field
              name="type"
              validators={{
                onChange: ({ value }) => {
                  const result = schema.shape.type.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <Field.Root>
                  <RadioCard.Root
                    w="100%"
                    name="type"
                    value={field.state.value}
                    invalid={!!field.state.meta.errors.length}
                    onValueChange={(details) => {
                      if (details.value != null) {
                        field.handleChange(
                          details.value as typeof field.state.value,
                        );
                      }
                    }}
                  >
                    <RadioCard.Label>{t('type.label')}</RadioCard.Label>
                    <HStack align="stretch">
                      {schema.shape.type.options.map((item) => (
                        <RadioCard.Item
                          key={item}
                          value={item}
                          h="10"
                          display="flex"
                          justifyContent="center"
                          cursor="pointer"
                        >
                          <RadioCard.ItemHiddenInput />
                          <RadioCard.ItemControl>
                            <RadioCard.ItemText>
                              {t(`type.${item}`)}
                            </RadioCard.ItemText>
                            <RadioCard.ItemIndicator />
                          </RadioCard.ItemControl>
                        </RadioCard.Item>
                      ))}
                    </HStack>
                  </RadioCard.Root>
                  <Field.ErrorText>
                    {field.state.meta.errors[0]}
                  </Field.ErrorText>
                </Field.Root>
              )}
            </form.Field>

            <form.Field
              name="amount"
              validators={{
                onChange: ({ value }) => {
                  const result = schema.shape.amount.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <Field.Root invalid={!!field.state.meta.errors.length}>
                  <Field.Label>{t('amount')}</Field.Label>
                  <NumberInput.Root
                    w="100%"
                    min={0}
                    name="amount"
                    value={String(field.state.value ?? '')}
                    onValueChange={(details) => {
                      const val = details.valueAsNumber;
                      if (!Number.isNaN(val)) {
                        field.handleChange(val); // string → number
                      }
                    }}
                  >
                    <NumberInput.Control />
                    <NumberInput.Input />
                  </NumberInput.Root>
                  <Field.ErrorText>
                    {field.state.meta.errors[0]}
                  </Field.ErrorText>
                </Field.Root>
              )}
            </form.Field>

            <form.Field
              name="asset"
              validators={{
                onChange: ({ value }) => {
                  const result = schema.shape.asset.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <Field.Root invalid={!!field.state.meta.errors.length}>
                  <Field.Label>{t('asset')}</Field.Label>
                  <Input
                    name="asset"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Field.ErrorText>
                    {field.state.meta.errors?.[0]}
                  </Field.ErrorText>
                </Field.Root>
              )}
            </form.Field>
          </Grid>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf="flex-start"
          minW={{ base: '100%', md: '60' }}
        >
          {t('submit')}
        </Button>
      </Fieldset.Root>
    </form>
  );
}
