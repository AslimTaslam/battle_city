import { useRef, useEffect, useState, FC } from 'react';
import { observer } from 'mobx-react-lite';

import { GameService } from 'src/services/Game/GameService';

export const GameCanvas: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<number>(0);
  const [gameService, setGameService] = useState<GameService | null>(null);

  const updateCanvasSize = () => {
    const width = window.innerWidth - 30;
    const height = window.innerHeight - 30;
    const newSize = Math.min(width, height);
    setCanvasSize(newSize);
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    if (canvasSize > 0) {
      setGameService(new GameService());
    }
  }, [canvasSize]);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!gameService) return;

    switch (event.key) {
      case 'ArrowUp':
        gameService.playerService.movePlayer(0, 'up', canvasSize);
        break;
      case 'ArrowDown':
        gameService.playerService.movePlayer(0, 'down', canvasSize);
        break;
      case 'ArrowLeft':
        gameService.playerService.movePlayer(0, 'left', canvasSize);
        break;
      case 'ArrowRight':
        gameService.playerService.movePlayer(0, 'right', canvasSize);
        break;
      case ' ': // Пробел для стрельбы
        gameService.playerService.shootPlayer(0);
        break;
    }
  };

  useEffect(() => {
    if (!gameService) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameService]);

  useEffect(() => {
    if (!gameService) return;
    gameService.initGame(canvasRef.current, false);
  }, [gameService]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{ border: '1px solid black' }}
    />
  );
});
