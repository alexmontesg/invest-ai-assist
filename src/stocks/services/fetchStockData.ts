const API_KEY = import.meta.env.VITE_API_KEY;
import { Money } from '@/domain/money';
import type { Stock } from '@/stocks/types/stock';

export async function fetchStockData({ ticker }: { ticker: string }) {
  const res = await fetch(
    `/findata/api/v1/stock-prices?identifier=${ticker.toUpperCase()}&key=${API_KEY}`,
  );
  const json = await res.json();
  if (!json[0]) throw new Error('Stock not found');

  return { stock: mapToStockData(json[0]) };
}

function mapToStockData(apiResponse: {
  trading_symbol: string;
  close: number;
}): Stock {
  return {
    id: apiResponse.trading_symbol,
    price: Money.fromUnit(apiResponse.close),
    asset: apiResponse.trading_symbol,
  };
}
