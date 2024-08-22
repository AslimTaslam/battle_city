import { makeAutoObservable } from 'mobx';

import { TankDirection } from 'src/services/Tank/types';
import TankService from 'src/services/Tank';

export class EnemyStore {
  enemies: TankService[] = [];
  tankSize = 40;
  bulletSize = 5;
  tankSpeed = 1;
  startCoordinats = { x: 200, y: 50 };
  defaultDirection: TankDirection = 'down';

  constructor() {
    makeAutoObservable(this);
  }

  initializeEnemies(count: number) {
    this.enemies = [];
    for (let i = 0; i < count; i++) {
      this.enemies.push(
        new TankService(
          this.startCoordinats.x + i * 100,
          this.startCoordinats.y,
          this.tankSpeed,
          this.defaultDirection,
          this.tankSize,
          this.bulletSize,
        ),
      );
    }
  }

  moveEnemy(id: number, direction: TankDirection, canvasSize: number) {
    const enemy = this.enemies[id];
    if (enemy) {
      enemy.move(direction, canvasSize);
    }
  }

  shootEnemy(id: number) {
    const enemy = this.enemies[id];
    if (enemy) {
      enemy.shoot();
    }
  }
}

export const enemyStore = new EnemyStore();
