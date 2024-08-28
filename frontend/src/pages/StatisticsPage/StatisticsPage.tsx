import { FC } from 'react';

import GameService from 'src/services/Game';

interface StatisticsPageProps {
  gameService: GameService | null;
}

export const StatisticsPage: FC<StatisticsPageProps> = () => {
  return <div>StatisticsPage</div>;
};
