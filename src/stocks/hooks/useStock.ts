import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import type { Stock } from '@/stocks/types/stock';
import { fetchStockData } from '@/stocks/services/fetchStockData';

export function useStock({ query }: { query: string }) {
  const [stock, setStock] = useState<Stock | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['stock', debouncedQuery],
    queryFn: ({ signal }) => fetchStockData({ ticker: debouncedQuery, signal }),
    enabled: !!debouncedQuery,
    retry: false,
  });

  useEffect(() => {
    setStock(data?.stock || null);
  }, [data]);

  setError(isError ? 'stock.error' : null);
  const clearStock = useCallback(() => setStock(null), []);
  const clearError = useCallback(() => setError(null), []);

  return { stock, isLoading, error, isError, clearStock, clearError };
}
