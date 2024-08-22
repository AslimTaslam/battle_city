import { makeAutoObservable } from 'mobx';

import { Obstacle } from './ObstacleStore';

export class MapStore {
  obstacles: Obstacle[] = [];

  constructor() {
    makeAutoObservable(this);
    this.generateObstacles();
  }

  generateObstacles() {
    // Генерация карты с препятствиями (вода, трава, кирпичи и т.д.)
    this.obstacles.push(new Obstacle('water', 100, 100, 50));
    this.obstacles.push(new Obstacle('brick', 200, 200, 50));
    // и т.д.
  }

  getObstacleAtPosition(x: number, y: number): Obstacle | undefined {
    return this.obstacles.find(
      (obs) =>
        x >= obs.x &&
        x <= obs.x + obs.size &&
        y >= obs.y &&
        y <= obs.y + obs.size,
    );
  }
}
