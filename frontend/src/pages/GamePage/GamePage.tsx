import { FC, useState, useEffect } from 'react';

import GameService from 'src/services/Game';
import { GameCanvas } from 'src/components/GameCanvas';
import * as Style from './GamePage.style';

interface GamePageProps {
  gameService: GameService | null;
}

export const GamePage: FC<GamePageProps> = ({ gameService }) => {
  const [isPaused, setIsPaused] = useState(false);

  const togglePaused = () => {
    setIsPaused((prevState) => !prevState);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'p') {
      togglePaused();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Style.Wrapper>
      {isPaused && <Style.PausedLayout />}
      <Style.ButtonWrapper>
        <Style.ReturnLink to="/">Return</Style.ReturnLink>
        <Style.Button onClick={togglePaused}>
          {isPaused ? 'Start' : 'Pause'}
        </Style.Button>
      </Style.ButtonWrapper>

      <GameCanvas isPaused={isPaused} gameService={gameService} />
    </Style.Wrapper>
  );
};
