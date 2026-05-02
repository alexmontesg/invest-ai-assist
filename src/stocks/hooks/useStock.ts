import { useCallback, useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { Stock } from '@/stocks/types/stock';
import { fetchStockData } from '@/stocks/services/fetchStockData';

export function useStock({ query }: { query: string }) {
  const [stock, setStock] = useState<Stock | null>(null);
  const [error, setError] = useState<string>('');

  const previousQuery = useRef(query);

  const debouncedSearch = useDebouncedCallback(async (q) => {
    setError('');
    setStock(null);

    if (previousQuery.current === q) return;

    previousQuery.current = q;
    try {
      const { stock } = await fetchStockData({ ticker: q });
      if (!stock) return;

      setStock(stock);
    } catch (err) {
      console.error(err);
      setError('stock.error');
    }
  }, 500);

  const clearStock = useCallback(() => setStock(null), []);

  return { stock, error, getStock: debouncedSearch, clearStock };
}
