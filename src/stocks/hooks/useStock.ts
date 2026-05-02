import { useCallback, useState, useRef, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { Stock } from '@/stocks/types/stock';
import { fetchStockData } from '@/stocks/services/fetchStockData';

export function useStock({ query }: { query: string }) {
  const [stock, setStock] = useState<Stock | null>(null);
  const [error, setError] = useState<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const previousQuery = useRef(query);

  const debouncedSearch = useDebouncedCallback(async (q) => {
    setError('');
    setStock(null);

    if (previousQuery.current === q) return;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    previousQuery.current = q;
    try {
      const { stock } = await fetchStockData({
        ticker: q,
        signal: controller.signal,
      });
      if (!stock) return;

      setStock(stock);
    } catch (err) {
      // Ignore aborted requests
      if (err instanceof DOMException && err.name === 'AbortError') return;

      console.error(err);
      setError('stock.error');
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  }, 500);

  const clearStock = useCallback(() => setStock(null), []);

  return { stock, error, getStock: debouncedSearch, clearStock };
}
