import { createContext } from 'react';

type CurrencyContextType = {
  allowedCurrencies: string[];
  selectedCurrency: string;
  updateCurrency: (currency: string) => void;
};

export const CurrencyContext = createContext<CurrencyContextType>({
  allowedCurrencies: [''],
  selectedCurrency: '',
  updateCurrency: () => {},
});
