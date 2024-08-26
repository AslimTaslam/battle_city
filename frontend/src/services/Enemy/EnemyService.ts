import { enemyStore, EnemyStore } from 'src/store/EnemyStore';
import { Direction } from 'src/services/Tank/types';

export class EnemyService {
  private enemyStore: EnemyStore;

  constructor() {
    this.enemyStore = enemyStore;
  }

  initializeEnemies(count: number) {
    this.enemyStore.initializeEnemies(count);
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
      width: this.enemyStore.tankSize,
      height: this.enemyStore.tankSize,
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
