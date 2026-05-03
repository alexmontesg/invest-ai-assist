import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '@/ui/components/Header';
import routes from '@/router/routes';
import AppProviders from '@/AppProviders';

function App() {
  return (
    <AppProviders>
      <Header />
      <Suspense>
        <Routes>
          {routes.map((r) => (
            <Route key={r.id} {...r} />
          ))}
        </Routes>
      </Suspense>
    </AppProviders>
  );
}

export default App;
