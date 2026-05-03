import { Money } from '@/domain/money';
import type { Stock } from '@/stocks/types/stock';

export async function fetchStockData({
  ticker,
  signal,
}: {
  ticker: string;
  signal?: AbortSignal;
}) {
  try {
    const res = await fetch(
      `/findata/api/v1/stock-prices?identifier=${ticker.toUpperCase()}`,
      { signal },
    );
    const json = await res.json();
    if (!json[0]) throw new Error('Stock not found');
    return { stock: mapToStockData(json[0]) };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }

    throw new Error('Error retrieving stock data', { cause: err });
  }
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
