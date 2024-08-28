import { FC, lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import GameService from 'src/services/Game';
import PageLoader from 'src/pages/PageLoader';

const HomePage = lazy(() => import('../pages/HomePage'));
const GamePage = lazy(() => import('../pages/GamePage'));
const StatisticsPage = lazy(() => import('../pages/StatisticsPage'));

interface AppRoutesProps {
  gameService: GameService | null;
}

const AppRoutes: FC<AppRoutesProps> = ({ gameService }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage gameService={gameService} />} />
        <Route path="game" element={<GamePage gameService={gameService} />} />
        <Route
          path="stat"
          element={<StatisticsPage gameService={gameService} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
