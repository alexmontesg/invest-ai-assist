import { CurrencyContext } from '@/context/currency/context';
import { useState, type ReactNode } from 'react';
import { CONVERSION_RATES } from '@/context/currency/conversionRates';

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [allowedCurrencies] = useState(Object.keys(CONVERSION_RATES));
  type Currency = keyof typeof CONVERSION_RATES;

  const [selectedCurrency, setSelectedCurrency] = useState(
    allowedCurrencies[0],
  );

  const convertTo = (amount: number, currency: Currency) =>
    amount * CONVERSION_RATES[currency];

  return (
    <CurrencyContext.Provider
      value={{
        allowedCurrencies,
        selectedCurrency,
        convertTo,
        updateCurrency: setSelectedCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
