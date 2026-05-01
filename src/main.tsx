import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import '@/i18n.ts';
import { hydrateWatchlist } from '@/watchlist/slices/watchlist';
import { watchlistStorage } from '@/watchlist/persistence/storage';
import { store } from '@/store/store';

async function bootstrap() {
  const saved = await watchlistStorage.get();

  if (saved) {
    store.dispatch(hydrateWatchlist(saved));
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}

bootstrap();
