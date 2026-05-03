import { Provider as ChakraProvider } from '@/framework/chakra/provider';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CurrencyProvider } from '@/context/currency/provider';
import { store } from '@/store/store';

const queryClient = new QueryClient();

const providers = [
  (children: React.ReactNode) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  ),
  (children: React.ReactNode) => <ChakraProvider>{children}</ChakraProvider>,
  (children: React.ReactNode) => (
    <ReduxProvider store={store}>{children}</ReduxProvider>
  ),
  (children: React.ReactNode) => (
    <CurrencyProvider>{children}</CurrencyProvider>
  ),
];

export default ({ children }: { children: React.ReactNode }) =>
  providers.reduceRight((acc, Provider) => Provider(acc), children);
