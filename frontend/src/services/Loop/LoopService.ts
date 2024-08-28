import { GameService } from 'src/services/Game/GameService';

export class LoopService {
  private running: boolean = true;
  private frameId: number | null = null;
  private canvasSize: number;
  private gameService: GameService;

  constructor(gameService: GameService, canvasSize: number) {
    this.gameService = gameService;
    this.canvasSize = canvasSize;
  }

  start() {
    this.running = true;
    this.loop();
  }

  pause() {
    this.running = false;
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private loop = () => {
    if (!this.running) return;

    // Основной цикл игры
    this.gameService.enemyService.moveEnemiesRandomly(this.canvasSize);
    this.gameService.playerService.updateBullets(this.canvasSize);

    this.gameService.renderGame();

    // Запуск следующего кадра
    this.frameId = requestAnimationFrame(this.loop);
  };
}
