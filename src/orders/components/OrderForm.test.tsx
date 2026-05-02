import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import OrderForm from './OrderForm';
import { renderWithProviders, type TestStoreState } from '@/orders/test/utils';

// Mock crypto.randomUUID to return predictable IDs
const mockUUID = '123e4567-e89b-12d3-a456-426614174000';
vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID);

// Mock Date to return predictable date
const mockDate = '2026-05-02T12:00:00.000Z';
vi.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);

// Initialize i18n for tests
i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['translation'],
  resources: {
    en: {
      translation: {
        orders: {
          form: {
            title: 'Create Order',
            'type.label': 'Order Type',
            'type.buy': 'Buy',
            'type.sell': 'Sell',
            asset: 'Asset',
            amount: 'Amount',
            submit: 'Submit Order',
          },
        },
      },
    },
  },
});

describe('OrderForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the order form with all fields', () => {
      renderWithProviders(<OrderForm />);

      expect(screen.getByText('Create Order')).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /buy/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /sell/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/asset/i)).toBeInTheDocument();
      expect(
        screen.getByRole('spinbutton', { name: /amount/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /submit order/i }),
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

      expect(amountInput).toHaveValue('10');
    });

    it('should allow clearing amount value', async () => {
      const { user } = renderWithProviders(<OrderForm />);

      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });
      await user.type(amountInput, '10');
      expect(amountInput).toHaveValue('10');

      await user.clear(amountInput);
      expect((amountInput as HTMLInputElement).value).toBe('');
    });
  });

  describe('Form Submission', () => {
    it('should submit form with buy order and add to Redux state', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });

      await user.type(assetInput, 'BTC');
      await user.type(amountInput, '5');

      const submitButton = screen.getByRole('button', {
        name: /submit order/i,
      });
      await user.click(submitButton);

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

      const sellRadio = screen.getByRole('radio', { name: /sell/i });
      await user.click(sellRadio);

      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });

      await user.type(assetInput, 'ETH');
      await user.type(amountInput, '3');

      const submitButton = screen.getByRole('button', {
        name: /submit order/i,
      });
      await user.click(submitButton);

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

      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });
      const submitButton = screen.getByRole('button', {
        name: /submit order/i,
      });

      // Add first order
      await user.type(assetInput, 'BTC');
      await user.type(amountInput, '5');
      await user.click(submitButton);

      // Clear and add second order
      await user.clear(assetInput);
      await user.clear(amountInput);
      await user.type(assetInput, 'ETH');
      await user.type(amountInput, '10');

      const mockUUID2 = '223e4567-e89b-12d3-a456-426614174001';
      vi.spyOn(crypto, 'randomUUID').mockReturnValueOnce(mockUUID2);

      await user.click(submitButton);

      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(2);
      expect(state.orders.orders[0].asset).toBe('BTC');
      expect(state.orders.orders[1].asset).toBe('ETH');
    });

    it('should include price in the submitted order', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      const amountInput = screen.getByRole('spinbutton', { name: /amount/i });

      await user.type(assetInput, 'BTC');
      await user.type(amountInput, '5');

      const submitButton = screen.getByRole('button', {
        name: /submit order/i,
      });
      await user.click(submitButton);

      const state = store.getState() as TestStoreState;
      const order = state.orders.orders[0];
      expect(order.price).toBeDefined();
      expect(order.price.value).toBe(100);
      expect(order.price.currencyCode).toBeTruthy();
    });
  });

  describe('Form Validation', () => {
    it('should submit with minimal valid data (asset only)', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      const assetInput = screen.getByRole('textbox', { name: /asset/i });
      await user.type(assetInput, 'BTC');

      const submitButton = screen.getByRole('button', {
        name: /submit order/i,
      });
      await user.click(submitButton);

      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(1);
      expect(state.orders.orders[0].asset).toBe('BTC');
    });

    it('should handle empty asset field', async () => {
      const { user, store } = renderWithProviders(<OrderForm />);

      const submitButton = screen.getByRole('button', {
        name: /submit order/i,
      });
      await user.click(submitButton);

      const state = store.getState() as TestStoreState;
      expect(state.orders.orders).toHaveLength(1);
      expect(state.orders.orders[0].asset).toBe('');
    });
  });
});
