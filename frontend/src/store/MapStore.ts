import { makeAutoObservable } from 'mobx';

import { ObstacleService } from '../services/Obstacle/ObstacleService';

export class MapStore {
  obstacles: ObstacleService[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addObstacle(obstacle: ObstacleService) {
    this.obstacles.push(obstacle);
  }

  clearObstacles() {
    this.obstacles = [];
  }

  getObstacleAtPosition(x: number, y: number): ObstacleService | undefined {
    return this.obstacles.find(
      (obs) =>
        x >= obs.x &&
        x <= obs.x + obs.width &&
        y >= obs.y &&
        y <= obs.y + obs.height,
    );
  }
}

export const mapStore = new MapStore();
