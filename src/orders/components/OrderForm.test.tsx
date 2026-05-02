import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { combineReducers } from 'redux';

import OrderForm from './OrderForm';
import OrderList from './OrderList';
import { CurrencyProvider } from '@/context/currency/provider';
import ordersReducer from '@/orders/state/orders';
import watchlistReducer from '@/watchlist/state/watchlist';
import useOrders from '@/orders/hooks/useOrders';
import type { Order } from '@/orders/types/order';
import type { SerializedMoney } from '@/domain/money';

// Initialize i18n for tests
i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['translation'],
  resources: {
    en: {
      translation: {
        orders: {
          form: {
            title: 'New Order',
            'type.label': 'Order Type',
            'type.buy': 'Buy',
            'type.sell': 'Sell',
            asset: 'Asset',
            amount: 'Amount',
            submit: 'Submit',
          },
          order: {
            title: {
              buy: 'Buy Order: {{asset}}',
              sell: 'Sell Order: {{asset}}',
            },
          },
        },
      },
    },
  },
});

// Mock crypto.randomUUID to return predictable IDs
const mockUUID = '123e4567-e89b-12d3-a456-426614174000';
vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID);

// Mock Date to return predictable date
const mockDate = '2026-05-02T12:00:00.000Z';
vi.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);

// Define the state types
interface OrdersState {
  orders: Order[];
}

interface WatchlistState {
  assets: string[];
}

interface TestStoreState {
  orders: OrdersState;
  watchlist: WatchlistState;
}

// Create typed combined reducer
const rootReducer = combineReducers({
  orders: ordersReducer,
  watchlist: watchlistReducer,
});

function renderWithProviders(
  ui: React.ReactNode,
  preloadedState?: Partial<TestStoreState>,
) {
  // Create a complete initial state with defaults
  const initialOrdersState: OrdersState = { orders: [] };
  const initialWatchlistState: WatchlistState = { assets: [] };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      orders: preloadedState?.orders ?? initialOrdersState,
      watchlist: preloadedState?.watchlist ?? initialWatchlistState,
    } as TestStoreState,
  });

  const user = userEvent.setup();

  return {
    user,
    store,
    ...render(ui, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>
          <ChakraProvider value={defaultSystem}>
            <CurrencyProvider>{children}</CurrencyProvider>
          </ChakraProvider>
        </Provider>
      ),
    }),
  };
}

describe('OrderForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the order form with all fields', () => {
      renderWithProviders(<OrderForm />);

      // Check for the form title - using text content since legend might not have accessible name
      expect(screen.getByText('New Order')).toBeInTheDocument();

      // Check for order type radio cards (buy/sell)
      expect(screen.getByRole('radio', { name: /buy/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /sell/i })).toBeInTheDocument();

      // Check for asset input - use label text
      expect(screen.getByLabelText(/asset/i)).toBeInTheDocument();

      // Check for amount input (NumberInput)
      expect(
        screen.getByRole('spinbutton', { name: /amount/i }),
      ).toBeInTheDocument();

      // Check for submit button
      expect(
        screen.getByRole('button', { name: /submit/i }),
      ).toBeInTheDocument();
    });

    it('should have buy selected by default', () => {
      renderWithProviders(<OrderForm />);

      const buyRadio = screen.getByRole('radio', { name: /buy/i });
      expect(buyRadio).toBeChecked();
    });
  });

  describe('Form Interactions', () => {
    it('should allow selecting sell order type', async () => {
      const { user } = renderWithProviders(<OrderForm />);

      const sellRadio = screen.getByRole('radio', { name: /sell/i });
      await user.click(sellRadio);

      expect(sellRadio).toBeChecked();
      const buyRadio = screen.getByRole('radio', { name: /buy/i });
      expect(buyRadio).not.toBeChecked();
    });

    it('should allow typing in asset field', async () => {
      const { user } = renderWithProviders(<OrderForm />);

      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      await user.type(assetInput, 'BTC');

      expect(assetInput).toHaveValue('BTC');
    });

    it('should allow changing amount value', async () => {
      const { user } = renderWithProviders(<OrderForm />);

      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });
      await user.type(amountInput, '10');

      // NumberInput stores value as string
      expect(amountInput).toHaveValue('10');
    });

    it('should allow clearing amount value', async () => {
      const { user } = renderWithProviders(<OrderForm />);

      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });
      await user.type(amountInput, '10');
      expect(amountInput).toHaveValue('10');

      await user.clear(amountInput);
      // After clearing, the value might be empty string or null
      expect((amountInput as HTMLInputElement).value).toBe('');
    });
  });

  describe('Form Submission', () => {
    it('should submit form with buy order and add to Redux state', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      // Fill in the form
      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });

      await user.type(assetInput, 'BTC');
      await user.type(amountInput, '5');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Verify Redux state was updated
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(1);
      expect(state.orders.orders[0]).toMatchObject({
        id: mockUUID,
        type: 'buy',
        asset: 'BTC',
        amount: 5,
        date: mockDate,
      });
      expect(state.orders.orders[0].price).toBeDefined();
    });

    it('should submit form with sell order and add to Redux state', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      // Select sell type
      const sellRadio = screen.getByRole('radio', { name: /sell/i });
      await user.click(sellRadio);

      // Fill in the form
      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });

      await user.type(assetInput, 'ETH');
      await user.type(amountInput, '3');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Verify Redux state was updated
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(1);
      expect(state.orders.orders[0]).toMatchObject({
        id: mockUUID,
        type: 'sell',
        asset: 'ETH',
        amount: 3,
        date: mockDate,
      });
    });

    it('should add multiple orders correctly', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      // Add first order
      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await user.type(assetInput, 'BTC');
      await user.type(amountInput, '5');
      await user.click(submitButton);

      // Clear and add second order
      await user.clear(assetInput);
      await user.clear(amountInput);
      await user.type(assetInput, 'ETH');
      await user.type(amountInput, '10');

      // Need to mock a new UUID for the second order
      const mockUUID2 = '223e4567-e89b-12d3-a456-426614174001';
      vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce(mockUUID2);

      await user.click(submitButton);

      // Verify Redux state has both orders
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(2);
      expect(state.orders.orders[0].asset).toBe('BTC');
      expect(state.orders.orders[1].asset).toBe('ETH');
    });

    it('should include price in the submitted order', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      // Fill in the form
      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });

      await user.type(assetInput, 'BTC');
      await user.type(amountInput, '5');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Verify price is set
      const state = store.getState() as TestStoreState;
      const order = state.orders.orders[0];
      const price = order.price as SerializedMoney;
      expect(price).toBeDefined();
      expect(price.value).toBe(100); // Money.fromUnit(100, selectedCurrency)
      expect(price.currencyCode).toBeTruthy();
    });
  });

  describe('Integration with OrderList', () => {
    it('should display submitted order in OrderList', async () => {
      const { user } = renderWithProviders(
        <div>
          <OrderForm />
          <OrderList />
        </div>,
        {
          watchlist: { assets: [] },
        },
      );

      // Fill in the form
      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });

      await user.type(assetInput, 'BTC');
      await user.type(amountInput, '5');

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Verify order appears in OrderList - look for the order title heading
      expect(
        await screen.findByRole('heading', { name: 'Buy Order: BTC' }),
      ).toBeInTheDocument();

      // Verify the order card body contains the amount
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should display multiple orders in OrderList', async () => {
      // Mock different UUIDs for each order
      const mockUUID2 = '223e4567-e89b-12d3-a456-426614174001';

      const { user } = renderWithProviders(
        <div>
          <OrderForm />
          <OrderList />
        </div>,
        {
          watchlist: { assets: [] },
        },
      );

      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      // Add first order
      await user.type(assetInput, 'BTC');
      await user.type(amountInput, '5');
      await user.click(submitButton);

      // Clear and add second order
      await user.clear(assetInput);
      await user.clear(amountInput);
      await user.type(assetInput, 'ETH');
      await user.type(amountInput, '10');

      // Mock new UUID for second order
      vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce(mockUUID2);

      await user.click(submitButton);

      // Verify both orders appear in OrderList
      expect(
        await screen.findByRole('heading', { name: 'Buy Order: BTC' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Buy Order: ETH' }),
      ).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should submit with minimal valid data (asset only)', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      // Only fill asset (amount has min=0 so it might default to 0)
      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      await user.type(assetInput, 'BTC');

      // Submit with just asset
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Verify order was added (amount will be NaN or 0 depending on implementation)
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(1);
      expect(state.orders.orders[0].asset).toBe('BTC');
    });

    it('should handle empty asset field', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      // Don't fill asset, just submit
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Form will still submit - the order will have empty asset
      // This tests the current behavior (no validation)
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(1);
      expect(state.orders.orders[0].asset).toBe('');
    });
  });

  describe('Redux State Management', () => {
    it('should verify useOrders hook adds order correctly', async () => {
      const TestComponent = () => {
        const { orders, addOrder } = useOrders();

        return (
          <div>
            <span data-testid="order-count">{orders.length}</span>
            <button
              type="button"
              onClick={() =>
                addOrder({
                  id: 'test-id',
                  type: 'buy',
                  amount: 10,
                  asset: 'BTC',
                  price: { value: 100, scale: 100, currencyCode: 'USD' },
                  date: '2026-05-02T12:00:00.000Z',
                })
              }
            >
              Add Order Directly
            </button>
          </div>
        );
      };

      const { user, store } = renderWithProviders(<TestComponent />);

      // Click button to add order directly via hook
      const addButton = screen.getByRole('button', {
        name: /add order directly/i,
      });
      await user.click(addButton);

      // Verify order count
      expect(screen.getByTestId('order-count')).toHaveTextContent('1');

      // Verify Redux state
      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(1);
      expect(state.orders.orders[0].asset).toBe('BTC');
    });
  });
});
