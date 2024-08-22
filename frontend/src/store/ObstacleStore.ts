export class Obstacle {
  type: 'water' | 'brick' | 'stone' | 'grass' | 'ice';
  x: number;
  y: number;
  size: number;

  constructor(
    type: 'water' | 'brick' | 'stone' | 'grass' | 'ice',
    x: number,
    y: number,
    size: number,
  ) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  isPassableForBullet() {
    // Логика проверки, можно ли пробить препятствие
    return this.type !== 'stone' && this.type !== 'brick';
  }

  isPassableForTank() {
    // Логика проверки, можно ли проехать через препятствие
    return this.type === 'grass' || this.type === 'ice';
  }
}
