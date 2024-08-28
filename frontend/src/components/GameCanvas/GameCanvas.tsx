import { useRef, useEffect, useState, FC } from 'react';
import { observer } from 'mobx-react-lite';

import { GameService } from 'src/services/Game/GameService';
import { ModeItem } from 'src/services/Game/data';

interface GameCanvasProps {
  isPaused: boolean;
  gameService: GameService | null;
}

export const GameCanvas: FC<GameCanvasProps> = observer(
  ({ isPaused, gameService }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pressedKeys = useRef<{ [key: string]: boolean }>({});

    const [canvasSize, setCanvasSize] = useState<number>(0);

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
      if (gameService && canvasSize > 0) {
        gameService.initGame(canvasRef.current);
      }
    }, [canvasSize]);

    const handleKeyDown = (event: KeyboardEvent) => {
      pressedKeys.current[event.key] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.current[event.key] = false;
    };

    const processInput = () => {
      if (!gameService || isPaused) return;

      if (pressedKeys.current['ArrowUp']) {
        gameService.playerService.movePlayer(0, 'up', canvasSize);
      }
      if (pressedKeys.current['ArrowDown']) {
        gameService.playerService.movePlayer(0, 'down', canvasSize);
      }
      if (pressedKeys.current['ArrowLeft']) {
        gameService.playerService.movePlayer(0, 'left', canvasSize);
      }
      if (pressedKeys.current['ArrowRight']) {
        gameService.playerService.movePlayer(0, 'right', canvasSize);
      }
      if (pressedKeys.current[' ']) {
        gameService.playerService.shootPlayer(0);
      }

      if (gameService.gameStore.mode === ModeItem.Multiplayer) {
        if (pressedKeys.current['w']) {
          gameService.playerService.movePlayer(1, 'up', canvasSize);
        }
        if (pressedKeys.current['s']) {
          gameService.playerService.movePlayer(1, 'down', canvasSize);
        }
        if (pressedKeys.current['a']) {
          gameService.playerService.movePlayer(1, 'left', canvasSize);
        }
        if (pressedKeys.current['d']) {
          gameService.playerService.movePlayer(1, 'right', canvasSize);
        }
        if (pressedKeys.current['Shift']) {
          gameService.playerService.shootPlayer(1);
        }
      }
    };

    useEffect(() => {
      if (!gameService) return;

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      const interval = setInterval(() => {
        processInput();
      }, gameService?.gameStore.loopTimeMs);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        clearInterval(interval);
      };
    }, [gameService, isPaused]);

    useEffect(() => {
      if (!gameService) return;

      if (isPaused) {
        gameService.pauseGame();
      } else {
        gameService.resumeGame();
      }
    }, [isPaused, gameService]);

    return (
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ border: '1px solid black' }}
      />
    );
  },
);
