import { GameElement } from '../Game/types';
import { ObstacleType } from './types';

export class ObstacleService extends GameElement {
  obstacleType: ObstacleType;

  constructor(
    type: ObstacleType,
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
  ) {
    super('obstacle', x, y, height, width, color);
    this.obstacleType = type;
  }
  update() {}

  isPassableForBullet() {
    // Логика проверки, можно ли пробить препятствие
    // return this.type !== 'stone' && this.type !== 'brick';
  }

  isPassableForTank() {
    // Логика проверки, можно ли проехать через препятствие
    // return this.type === 'grass' || this.type === 'ice';
  }
}