import { enemyStore, EnemyStore } from 'src/store/EnemyStore';
import { Direction } from 'src/services/Tank/types';
import TankService from '../Tank';
import CollisionService from '../Collision';

export class EnemyService {
  private enemyStore: EnemyStore;
  private collisionService: CollisionService;

  constructor(collisionService: CollisionService) {
    this.enemyStore = enemyStore;
    this.collisionService = collisionService;
  }

  initializeEnemies(count: number) {
    const baseCharacteristics = {
      height: enemyStore.height,
      width: enemyStore.width,
      color: enemyStore.color,
      speed: enemyStore.tankSpeed,
      direction: enemyStore.defaultDirection,
    };
    const enemies = [];
    for (let i = 0; i < count; i++) {
      enemies.push(
        new TankService(
          {
            x: enemyStore.startCoordinats.x + i * 100,
            y: enemyStore.startCoordinats.y,
            ...baseCharacteristics,
          },
          this.collisionService,
        ),
      );
    }
    this.enemyStore.initializeEnemies(enemies);
  }

  moveEnemy(id: number, direction: Direction, canvasSize: number) {
    this.enemyStore.moveEnemy(id, direction, canvasSize);
  }

  shootEnemy(id: number) {
    this.enemyStore.shootEnemy(id);
  }

  getEnemyElements() {
    return this.enemyStore.enemies.map((enemy) => ({
      x: enemy.x,
      y: enemy.y,
      width: this.enemyStore.width,
      height: this.enemyStore.height,
      color: 'blue',
      bullets: enemy.bullets.map((bullet) => ({
        x: bullet.x,
        y: bullet.y,
        width: this.enemyStore.bulletSize,
        height: this.enemyStore.bulletSize,
        color: 'yellow',
      })),
    }));
  }

  // Логика для случайного движения врагов
  moveEnemiesRandomly(canvasSize: number) {
    this.enemyStore.enemies.forEach((enemy, index) => {
      const directions: Direction[] = ['up', 'down', 'left', 'right'];
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
      this.moveEnemy(index, randomDirection, canvasSize);
    });
  }

  // Логика для автоматической стрельбы
  shootEnemies() {
    this.enemyStore.enemies.forEach((enemy, index) => {
      // Например, враги могут стрелять с некоторым интервалом
      this.shootEnemy(index);
    });
  }
}
