import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Header from '@/ui/components/Header';
import ErrorView from '@/ui/components/ErrorView';
import routes from '@/router/routes';
import AppProviders from '@/AppProviders';

function App() {
  return (
    <AppProviders>
      <Header />
      <ErrorBoundary FallbackComponent={ErrorView}>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {routes.map((r) => (
              <Route key={r.id} {...r} />
            ))}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AppProviders>
  );
}

export default App;
