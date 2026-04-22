import { useCallback, useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { Stock } from '@/stocks/types/stock';
import { fetchStockData } from '@/stocks/services/fetchStockData';

export function useStock({ query }: { query: string }) {
  const [stock, setStock] = useState<Stock | null>(null);
  const previousQuery = useRef(query);

  const debouncedSearch = useDebouncedCallback(async (q) => {
    if (previousQuery.current === q) return;

    previousQuery.current = q;
    const { stock } = await fetchStockData({ ticker: q });
    if (!stock) return;

    setStock(stock);
  }, 500);

  const clearStock = useCallback(() => setStock(null), []);

  return { stock, getStock: debouncedSearch, clearStock };
}
