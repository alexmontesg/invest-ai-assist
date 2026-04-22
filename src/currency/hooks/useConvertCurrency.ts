import { useContext } from 'react';
import { CurrencyContext } from '@/context/currency/context';
import { CONVERSION_RATES } from '@/currency/conversionRates';

type Currency = keyof typeof CONVERSION_RATES;

export function useConvertCurrency() {
  const { selectedCurrency } = useContext(CurrencyContext);

  const convertTo = (amount: number, currency: Currency) =>
    amount * CONVERSION_RATES[currency];

  return { convertTo, selectedCurrency };
}