import { createContext } from 'react';

export const CurrencyContext = createContext({
  allowedCurrencies: [''],
  selectedCurrency: '',
  convertTo: new Function(),
  updateCurrency: new Function(),
});
