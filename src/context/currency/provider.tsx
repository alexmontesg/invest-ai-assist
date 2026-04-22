import { CurrencyContext } from '@/context/currency/context';
import { useState, type ReactNode } from 'react';
import { CONVERSION_RATES } from '@/currency/conversionRates';

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [allowedCurrencies] = useState(Object.keys(CONVERSION_RATES));

  const [selectedCurrency, setSelectedCurrency] = useState(
    allowedCurrencies[0],
  );

  return (
    <CurrencyContext.Provider
      value={{
        allowedCurrencies,
        selectedCurrency,
        updateCurrency: setSelectedCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
