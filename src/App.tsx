import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { VStack } from '@chakra-ui/react';

import Header from '@/ui/components/Header';
import ErrorView from '@/ui/components/ErrorView';
import LoadingView from '@/ui/components/LoadingView';
import routes from '@/router/routes';
import AppProviders from '@/AppProviders';

function App() {
  return (
    <AppProviders>
      <VStack minH="100vh" align="stretch">
        <Header />
        <ErrorBoundary FallbackComponent={ErrorView}>
          <Suspense fallback={<LoadingView />}>
            <Routes>
              {routes.map((r) => (
                <Route key={r.id} {...r} />
              ))}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </VStack>
    </AppProviders>
  );
}

export default App;
