import { GameStore } from 'src/store/GameStore';
import MapService from 'src/services/Map';
import PlayerService from 'src/services/Players';
import EnemyService from 'src/services/Enemy';
import CollisionService from 'src/services/Collision';
// import AudioService from 'src/services/Audio';
// import StatisticService from 'src/services/Statistics';
import { playerStore } from 'src/store/PlayerStore';

export class GameService {
  gameStore: GameStore;
  mapService: MapService;
  playerService: PlayerService;
  enemyService: EnemyService;
  collisionService: CollisionService;
  // private audioService: AudioService;
  // private statisticService: StatisticService;
  private canvas: HTMLCanvasElement | null = null;

  constructor() {
    this.gameStore = new GameStore();
    this.mapService = new MapService();
    this.playerService = new PlayerService();
    this.enemyService = new EnemyService();
    this.collisionService = new CollisionService(this.mapService);
    // this.audioService = new AudioService();
    // this.statisticService = new StatisticService();
  }

  initGame(canvas: HTMLCanvasElement | null, isMultiplayer: boolean) {
    this.canvas = canvas;
    this.mapService.initializeLevel(
      0,
      this.canvas?.width ? this.canvas?.width / 13 : 680,
    );
    this.playerService.initializePlayers(isMultiplayer);
    // this.enemyService.initializeEnemies(3);
    this.renderGame();
    this.gameLoop();
  }

  gameLoop() {
    if (!this.canvas) return;

    const canvasSize = this.canvas.width;

    const loop = () => {
      // Обновляем состояние врагов
      this.collisionService.checkCollisions();
      this.enemyService.moveEnemiesRandomly(canvasSize);
      playerStore.updateBullet(canvasSize ? canvasSize : 680);

      this.renderGame();
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
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
