import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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

function renderWithState(assets: string[]) {
  const { wrapper } = renderWithStore(<Watchlist />, {
    watchlist: { assets },
  });

  return render(<Watchlist />, { wrapper });
}

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
});
