import { GameElement } from 'src/services/Game/types';
import { GameElementItem } from 'src/services/Game/data';
import { Direction } from 'src/services/Tank/types';

export class BulletService extends GameElement {
  direction: Direction;
  speed: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    direction: Direction,
    speed: number,
  ) {
    super(GameElementItem.Bullet, x, y, width, height, 'yellow');
    this.direction = direction;
    this.speed = speed;
  }

  move() {
    switch (this.direction) {
      case 'up':
        this.y -= this.speed;
        break;
      case 'down':
        this.y += this.speed;
        break;
      case 'left':
        this.x -= this.speed;
        break;
      case 'right':
        this.x += this.speed;
        break;
    }
  }

  update() {
    this.move(); // Обновляем координаты снаряда
  }
}
