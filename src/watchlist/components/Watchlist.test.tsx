import { render, screen } from '@testing-library/react';
import { renderWithStore } from '@/watchlist/test/utils';

import Watchlist from './Watchlist';

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
