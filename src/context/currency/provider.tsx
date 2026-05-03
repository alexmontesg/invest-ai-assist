import { CurrencyContext } from '@/context/currency/context';
import { useState, useMemo, type ReactNode } from 'react';
import { CONVERSION_RATES } from '@/currency/conversionRates';

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [allowedCurrencies] = useState(Object.keys(CONVERSION_RATES));

  const [selectedCurrency, setSelectedCurrency] = useState(
    allowedCurrencies[0],
  );

  const contextValue = useMemo(
    () => ({
      allowedCurrencies,
      selectedCurrency,
      updateCurrency: setSelectedCurrency,
    }),
    [allowedCurrencies, selectedCurrency, setSelectedCurrency],
  );

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
