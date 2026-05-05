import { describe, it, expect, vi, type Mock } from 'vitest';
import { screen } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { renderWithStore } from '@/watchlist/test/utils';

import Watchlist from './Watchlist';

// Initialize i18n for tests
i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['translation'],
  resources: {
    en: {
      translation: {
        watchlist: {
          empty: {
            title: 'Your watchlist is empty',
            description: 'Add assets to start tracking them',
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

function renderWithState(assets: string[], isLoading = false) {
  (useQuery as Mock).mockReturnValue({
    isLoading,
  });

  renderWithStore(<Watchlist />, {
    watchlist: { assets: assets },
  });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('Watchlist', () => {
  it('should render EmptyWatchlist when no assets', () => {
    renderWithState([]);

    expect(
      screen.getByRole('status', { name: 'empty-watchlist' }),
    ).toBeInTheDocument();
  });

  it('should render AssetList when assets exist', () => {
    renderWithState(['BTC']);

    expect(
      screen.getByRole('list', { name: 'watchlist-assets' }),
    ).toBeInTheDocument();
  });

  it('should be busy while loading', () => {
    renderWithState(['BTC'], true);

    expect(
      screen.getByRole('complementary', { name: 'watchlist' }),
    ).toHaveAttribute('aria-busy', 'true');
  });
});
