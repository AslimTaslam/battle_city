import { makeAutoObservable } from 'mobx';

import { Direction } from 'src/services/Tank/types';
import TankService from 'src/services/Tank';

export class EnemyStore {
  enemies: TankService[] = [];
  height = 36;
  width = 36;
  color = 'red';
  bulletSize = 5;
  tankSpeed = 1;
  startCoordinats = { x: 200, y: 5 };
  defaultDirection: Direction = 'down';

  constructor() {
    makeAutoObservable(this);
  }

  initializeEnemies(enemies: TankService[]) {
    this.enemies = enemies;
  }

  moveEnemy(id: number, direction: Direction) {
    const enemy = this.enemies[id];
    if (enemy) {
      enemy.move(direction);
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
