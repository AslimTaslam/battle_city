import { GameStore } from 'src/store/GameStore';
import MapService from 'src/services/Map';
import PlayerService from 'src/services/Players';
import EnemyService from 'src/services/Enemy';
import CollisionService from 'src/services/Collision';
import LoopService from 'src/services/Loop';
// import AudioService from 'src/services/Audio';
// import StatisticService from 'src/services/Statistics';

export class GameService {
  gameStore: GameStore;
  mapService: MapService;
  playerService: PlayerService;
  enemyService: EnemyService;
  collisionService: CollisionService;
  private loopService: LoopService;
  // private audioService: AudioService;
  // private statisticService: StatisticService;
  private canvas: HTMLCanvasElement | null = null;

  constructor() {
    this.gameStore = new GameStore();
    this.mapService = new MapService();
    this.collisionService = new CollisionService(this.mapService);
    this.playerService = new PlayerService(this.collisionService);
    this.enemyService = new EnemyService(this.collisionService);
    this.loopService = new LoopService(this, this.canvas?.width || 680);
    // this.audioService = new AudioService();
    // this.statisticService = new StatisticService();
  }

  initGame(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    if (!this.canvas) return;
    this.mapService.initializeLevel(
      this.gameStore.level,
      this.canvas.width / this.gameStore.numberElements,
    );
    this.playerService.updateStartCoordinates(this.canvas?.width);
    this.playerService.initializePlayers(this.gameStore.mode);

    this.renderGame();
    this.loopService.start();
  }

  pauseGame() {
    this.loopService.pause();
  }

  resumeGame() {
    this.loopService.start();
  }

  renderGame() {
    if (!this.canvas) return;

    const context = this.canvas.getContext('2d');

    if (!context) return;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // context.fillStyle = 'lightblue';

    // Отрисовка карты
    const elements = this.mapService.getElements();

    elements.forEach((element) => {
      context.fillStyle = element.color;
      context.fillRect(element.x, element.y, element.width, element.height);
    });

    // Отрисовка игроков
    this.playerService.getPlayerElements().forEach((element) => {
      context.fillStyle = element.color;
      context.fillRect(element.x, element.y, element.width, element.height);

      // Отрисовка снарядов игрока
      element.bullets.forEach((bullet) => {
        context.fillStyle = bullet.color;
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });
    });

    // Отрисовка врагов
    this.enemyService.getEnemyElements().forEach((element) => {
      context.fillStyle = element.color;
      context.fillRect(element.x, element.y, element.width, element.height);

      // Отрисовка снарядов врагов
      element.bullets.forEach((bullet) => {
        context.fillStyle = bullet.color;
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });
    });
  }
}

export const gameService = new GameService();
