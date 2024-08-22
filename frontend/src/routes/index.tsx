import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import PageLoader from 'src/pages/PageSpinner';

const HomePage = lazy(() => import('../pages/HomePage'));
const GamePage = lazy(() => import('../pages/GamePage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="load" element={<PageLoader />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
