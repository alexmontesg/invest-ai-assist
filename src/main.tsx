import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import '@/i18n.ts';
import { store } from '@/store/store';
import { bootstrapWatchlist } from '@/watchlist/state/bootstrap';
import { bootstrapOrders } from '@/orders/state/bootstrap';

async function bootstrap() {
  // TODO: Not scalable, bootstrap things as needed
  await Promise.all([
    bootstrapWatchlist(store.dispatch),
    bootstrapOrders(store.dispatch),
  ]);

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}

bootstrap();
