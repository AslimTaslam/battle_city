import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { GlobalStyle } from 'src/styles/global';
import AppRoutes from 'src/routes';
import { GameService } from 'src/services/Game/GameService';

const App: FC = () => {
  const [gameService, setGameService] = useState<GameService | null>(null);

  useEffect(() => {
    const newGameService = new GameService();
    setGameService(newGameService);
  }, []);
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppRoutes gameService={gameService} />
      </Router>
    </>
  );
};

export default App;
