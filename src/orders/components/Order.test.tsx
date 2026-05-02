import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Order from './Order';
import { renderWithProviders, type TestStoreState } from '@/orders/test/utils';
import type { Order as OrderType } from '@/orders/types/order';
import type { SerializedMoney } from '@/domain/money';

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

// Helper to create test orders
function createTestOrder(
  id: string,
  asset: string,
  type: 'buy' | 'sell' = 'buy',
): OrderType {
  return {
    id,
    type,
    amount: 10,
    asset,
    price: { value: 100, scale: 100, currencyCode: 'USD' } as SerializedMoney,
    date: '2026-05-02T12:00:00.000Z',
  };
}

describe('Order', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should display buy order correctly', () => {
      const order = createTestOrder('test-id-1', 'BTC', 'buy');

      renderWithProviders(<Order order={order} />);

      expect(screen.getByText(/Buy order for BTC/i)).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should display sell order correctly', () => {
      const order = createTestOrder('test-id-1', 'ETH', 'sell');

      renderWithProviders(<Order order={order} />);

      expect(screen.getByText(/Sell order for ETH/i)).toBeInTheDocument();
    });

    it('should show Repeat button', () => {
      const order = createTestOrder('test-id-1', 'BTC');

      renderWithProviders(<Order order={order} />);

      expect(
        screen.getByRole('button', { name: /repeat/i }),
      ).toBeInTheDocument();
    });

    it('should show Remove button', () => {
      const order = createTestOrder('test-id-1', 'BTC');

      renderWithProviders(<Order order={order} />);

      expect(
        screen.getByRole('button', { name: /remove/i }),
      ).toBeInTheDocument();
    });
  });

  describe('Order Removal', () => {
    it('should remove an order and update Redux state', async () => {
      const preloadedState: Partial<TestStoreState> = {
        orders: {
          orders: [createTestOrder('test-id-1', 'BTC')],
        },
      };

      const { user, store } = renderWithProviders(
        <Order order={createTestOrder('test-id-1', 'BTC')} />,
        {
          preloadedState,
        },
      );

      // Verify order is displayed
      expect(screen.getByText(/Buy order for BTC/i)).toBeInTheDocument();

      // Click the Remove button
      const removeButton = screen.getByRole('button', { name: /remove/i });
      await user.click(removeButton);

      // Verify order was removed from Redux state
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(0);
    });

    it('should remove the correct order when multiple orders exist', async () => {
      const btcOrder = createTestOrder('test-id-1', 'BTC', 'buy');
      const ethOrder = createTestOrder('test-id-2', 'ETH', 'sell');

      const preloadedState: Partial<TestStoreState> = {
        orders: {
          orders: [btcOrder, ethOrder],
        },
      };

      const { user, store } = renderWithProviders(<Order order={btcOrder} />, {
        preloadedState,
      });

      // Click the Remove button on BTC order
      const removeButton = screen.getByRole('button', { name: /remove/i });
      await user.click(removeButton);

      // Verify only ETH order remains in state
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(1);
      expect(state.orders.orders[0].asset).toBe('ETH');
    });
  });

  describe('Repeat Order', () => {
    it('should add a new order when repeat is clicked', async () => {
      const order = createTestOrder('test-id-1', 'BTC', 'buy');

      const preloadedState: Partial<TestStoreState> = {
        orders: {
          orders: [order],
        },
      };

      const { user, store } = renderWithProviders(<Order order={order} />, {
        preloadedState,
      });

      // Mock new UUID for repeated order
      const mockUUID2 = '223e4567-e89b-12d3-a456-426614174001';
      vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce(mockUUID2);

      // Click the Repeat button
      const repeatButton = screen.getByRole('button', { name: /repeat/i });
      await user.click(repeatButton);

      // Verify new order was added
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(2);
      expect(state.orders.orders[1].asset).toBe('BTC');
      expect(state.orders.orders[1].id).toBe(mockUUID2);
    });
  });
});
