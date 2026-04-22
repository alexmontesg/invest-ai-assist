import { createContext } from 'react';

export const CurrencyContext = createContext({
  allowedCurrencies: [''],
  selectedCurrency: '',
  updateCurrency: new Function(),
});
