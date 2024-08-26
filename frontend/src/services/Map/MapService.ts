import { Cell } from './data';
import { levels } from './levels';
import { GameElement } from './types';
import { ObstacleService } from '../Obstacle/ObstacleService';
import { mapStore, MapStore } from 'src/store/MapStore';

export class MapService {
  private mapStore: MapStore;

  constructor() {
    this.mapStore = mapStore;
  }

  initializeLevel(levelIndex: number, elementSize: number = 50) {
    const levelMap = levels[levelIndex];

    this.mapStore.clearObstacles(); // Очищаем препятствия перед генерацией

    for (let row = 0; row < levelMap.length; row++) {
      for (let col = 0; col < levelMap[row].length; col++) {
        const cellType = levelMap[row][col];
        const obstacle = this.createObstacle(
          cellType,
          col * elementSize,
          row * elementSize,
          elementSize,
        );
        if (obstacle) {
          this.mapStore.addObstacle(obstacle);
        }
      }
    }
  }

  private createObstacle(
    cellType: Cell,
    x: number,
    y: number,
    elementSize: number,
  ): ObstacleService | null {
    switch (cellType) {
      case Cell.Brick:
        return new ObstacleService(
          'brick',
          x,
          y,
          elementSize,
          elementSize,
          'brown',
        );
      case Cell.BrickTop:
        return new ObstacleService(
          'brick',
          x,
          y,
          elementSize / 2,
          elementSize,
          'brown',
        );
      case Cell.BrickBottom:
        return new ObstacleService(
          'brick',
          x,
          y + elementSize / 2,
          elementSize / 2,
          elementSize,
          'brown',
        );
      case Cell.BrickLeft:
        return new ObstacleService(
          'brick',
          x,
          y,
          elementSize,
          elementSize / 2,
          'brown',
        );
      case Cell.BrickRight:
        return new ObstacleService(
          'brick',
          x + elementSize / 2,
          y,
          elementSize,
          elementSize / 2,
          'brown',
        );
      case Cell.BrickBottomLeft:
        return new ObstacleService(
          'brick',
          x,
          y + elementSize / 2,
          elementSize / 2,
          elementSize / 2,
          'brown',
        );
      case Cell.BrickBottomRight:
        return new ObstacleService(
          'brick',
          x + elementSize / 2,
          y + elementSize / 2,
          elementSize / 2,
          elementSize / 2,
          'brown',
        );
      case Cell.Concrete:
        return new ObstacleService(
          'stone',
          x,
          y,
          elementSize,
          elementSize,
          'gray',
        );
      case Cell.ConcreteTop:
        return new ObstacleService(
          'stone',
          x,
          y,
          elementSize / 2,
          elementSize,
          'gray',
        );
      case Cell.ConcreteBottom:
        return new ObstacleService(
          'stone',
          x,
          y + elementSize / 2,
          elementSize / 2,
          elementSize,
          'gray',
        );
      case Cell.ConcreteLeft:
        return new ObstacleService(
          'stone',
          x,
          y,
          elementSize,
          elementSize / 2,
          'gray',
        );
      case Cell.ConcreteRight:
        return new ObstacleService(
          'stone',
          x + elementSize / 2,
          y,
          elementSize,
          elementSize / 2,
          'gray',
        );
      case Cell.ConcreteBottomLeft:
        return new ObstacleService(
          'stone',
          x,
          y + elementSize / 2,
          elementSize / 2,
          elementSize / 2,
          'gray',
        );
      case Cell.ConcreteBottomRight:
        return new ObstacleService(
          'stone',
          x + elementSize / 2,
          y + elementSize / 2,
          elementSize / 2,
          elementSize / 2,
          'gray',
        );
      case Cell.Forest:
        return new ObstacleService(
          'grass',
          x,
          y,
          elementSize,
          elementSize,
          'green',
        );
      case Cell.Water:
        return new ObstacleService(
          'water',
          x,
          y,
          elementSize,
          elementSize,
          'blue',
        );
      case Cell.Ice:
        return new ObstacleService(
          'ice',
          x,
          y,
          elementSize,
          elementSize,
          'lightblue',
        );
      case Cell.Base:
        return new ObstacleService(
          'hq',
          x,
          y,
          elementSize,
          elementSize,
          'yellow',
        );
      case Cell.Blank:
      default:
        return null;
    }
  }

  public getElements(): GameElement[] {
    return this.mapStore.obstacles;
  }
}
