import { useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { Stock } from '@/stocks/types/stock';
import { fetchStockData } from '@/stocks/services/fetchStockData';

export function useStock({ query }: { query: string }) {
  const [stock, setStock] = useState<Stock | null>(null);
  const previousQuery = useRef(query);

  const debouncedSearch = useDebouncedCallback(async (query) => {
    if (previousQuery.current === query) return;

    previousQuery.current = query;
    const { stock } = await fetchStockData({ ticker: query });
    if (!stock) return; // TODO: Error handling

    setStock(stock);
  }, 500);

  const clearStock = () => setStock(null);

  return { stock, getStock: debouncedSearch, clearStock };
}
