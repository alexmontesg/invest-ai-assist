import { describe, it, expect, vi, beforeAll, type Mock } from 'vitest';
import { screen } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import OrderList from './OrderList';
import { renderWithProviders, type TestStoreState } from '@/orders/test/utils';
import type { Order } from '@/orders/types/order';
import type { SerializedMoney } from '@/domain/money';

// IntersectionObserver is not available in jsdom
beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    },
  );
});

// Initialize i18n for tests
i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['translation'],
  resources: {
    en: {
      translation: {
        orders: {
          order: {
            title: {
              buy: 'Buy order for {{asset}} on {{date}}',
              sell: 'Sell order for {{asset}} on {{date}}',
            },
          },
          empty: {
            title: 'Your order history is empty',
            description: 'No orders available',
          },
        },
      },
    },
  },
});

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');

  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

// Helper to create test orders
function createTestOrder(
  id: string,
  asset: string,
  type: 'buy' | 'sell' = 'buy',
): Order {
  return {
    id,
    type,
    amount: 10,
    asset,
    price: { value: 100, scale: 100, currencyCode: 'USD' } as SerializedMoney,
    date: '2026-05-02T12:00:00.000Z',
  };
}

describe('OrderList', () => {
  afterEach(() => {
    (useQuery as Mock).mockReset();
  });

  it('should display empty state when no orders exist', () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
    });
    renderWithProviders(<OrderList />);

    expect(
      screen.getByText(/Your order history is empty/i),
    ).toBeInTheDocument();
  });

  it('should display a single order', () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
    });
    const preloadedState: Partial<TestStoreState> = {
      orders: {
        orders: [createTestOrder('test-id-1', 'BTC')],
      },
    };

    renderWithProviders(<OrderList />, { preloadedState });

    expect(screen.getByText(/Buy order for BTC/i)).toBeInTheDocument();
  });

  it('should display multiple orders', () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
    });
    const preloadedState: Partial<TestStoreState> = {
      orders: {
        orders: [
          createTestOrder('test-id-1', 'BTC', 'buy'),
          createTestOrder('test-id-2', 'ETH', 'sell'),
        ],
      },
    };

    renderWithProviders(<OrderList />, { preloadedState });

    expect(screen.getByText(/Buy order for BTC/i)).toBeInTheDocument();
    expect(screen.getByText(/Sell order for ETH/i)).toBeInTheDocument();
  });

  it('should display order details correctly', () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
    });

    const preloadedState: Partial<TestStoreState> = {
      orders: {
        orders: [
          {
            id: 'test-id-1',
            type: 'buy' as const,
            amount: 5,
            asset: 'AAPL',
            price: {
              value: 150,
              scale: 100,
              currencyCode: 'USD',
            } as SerializedMoney,
            date: '2026-05-02T12:00:00.000Z',
          },
        ],
      },
    };

    renderWithProviders(<OrderList />, { preloadedState });

    expect(screen.getByText(/Buy order for AAPL/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should be busy while loading', () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: true,
    });
    renderWithProviders(<OrderList />);

    expect(screen.getByLabelText(/orders/i)).toHaveAttribute(
      'aria-busy',
      'true',
    );
  });
});
