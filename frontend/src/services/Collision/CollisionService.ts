import MapService from 'src/services/Map';
import { GameElement } from 'src/services/Map/types';

export class CollisionService {
  private mapService: MapService;

  constructor(mapService: MapService) {
    this.mapService = mapService;
  }

  isColliding(a: GameElement, b: GameElement): boolean {
    return !(
      a.y + a.height < b.y ||
      a.y > b.y + b.height ||
      a.x + a.width < b.x ||
      a.x > b.x + b.width
    );
  }

  checkCollisionWithObstacles(element: GameElement): boolean {
    const obstacles = this.mapService.getElements();
    return obstacles.some((obstacle) => this.isColliding(element, obstacle));
  }
}

// export class CollisionService {
//   private playerStore: PlayerStore;
//   private enemyStore: EnemyStore;
//   private mapService: MapService;

//   constructor(mapService: MapService) {
//     this.playerStore = playerStore;
//     this.enemyStore = enemyStore;
//     this.mapService = mapService;
//   }

//   checkCollisions() {
//     this.checkTankCollisions();
//     this.checkBulletCollisions();
//   }

//   checkTankCollisions() {
//     const obstacles = this.mapService.getElements(); // Препятствия на карте
//     const allTanks = [...this.playerStore.players, ...this.enemyStore.enemies];
//     allTanks.forEach((tank) => {
//       obstacles.forEach((obstacle) => {
//         if (this.isColliding(tank, obstacle)) {
//           console.log(`tank`, tank);
//           console.log(`obstacle`, obstacle);
//           this.handleTankCollision(tank, obstacle);
//         }
//       });
//     });
//   }

//   checkBulletCollisions() {
//     const allBullets = [
//       ...this.playerStore.players.flatMap((player) => player.bullets),
//       ...this.enemyStore.enemies.flatMap((enemy) => enemy.bullets),
//     ];
//     const obstacles = this.mapService.getElements();
//     const allTanks = [...this.playerStore.players, ...this.enemyStore.enemies];
//     allBullets.forEach((bullet) => {
//       // Проверяем столкновения пуль с препятствиями
//       obstacles.forEach((obstacle) => {
//         if (this.isColliding(bullet, obstacle)) {
//           this.handleBulletCollision(bullet, obstacle);
//         }
//       });
//       // Проверяем столкновения пуль с танками
//       allTanks.forEach((tank) => {
//         if (this.isColliding(bullet, tank)) {
//           this.handleBulletCollision(bullet, tank);
//         }
//       });
//     });
//   }

//   isColliding(a: GameElement, b: GameElement): boolean {
//     return !(
//       a.y + a.height < b.y ||
//       a.y > b.y + b.height ||
//       a.x + a.width < b.x ||
//       a.x > b.x + b.width
//     );
//   }

//   handleTankCollision(tank: TankService, obstacle: GameElement) {
//     // Логика обработки столкновения танка с препятствием
//     console.log(`Tank collided with an obstacle at (${tank.x}, ${obstacle.y})`);
//     // Например, можно остановить движение танка или откатить его назад
//   }

//   handleBulletCollision(
//     bullet: { x: number; y: number; direction: string } & GameElement,
//     target: GameElement,
//   ) {
//     // Логика обработки столкновения пули с препятствием или танком
//     console.log(`Bullet collided with a target at (${bullet.x}, ${target.y})`);
//     // Можно удалить пулю и, если это танк, уменьшить его здоровье
//   }
// }
