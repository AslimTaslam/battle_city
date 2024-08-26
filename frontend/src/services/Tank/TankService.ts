import BulletService from 'src/services/Bullet';
import { GameElement } from 'src/services/Game/types';
import { GameElementItem } from 'src/services/Game/data';
import { Direction } from './types';

export class TankService extends GameElement {
  speed: number;
  direction: Direction;
  bullets: BulletService[] = [];
  bulletSpeed: number = 5;
  bulletWidth: number = 5;
  bulletHeight: number = 5;
  maxBullets: number = 1;

  constructor(
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
    speed: number,
    direction: Direction,
  ) {
    super(GameElementItem.Tank, x, y, height, width, color);
    this.speed = speed;
    this.direction = direction;
  }

  move(direction: Direction) {
    this.direction = direction;

    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case 'up':
        // newY = Math.max(0, this.y - this.speed);
        newY = this.y - this.speed;
        break;
      case 'down':
        // newY = Math.min(canvasSize - this.tankSize, this.y + this.speed);
        newY = this.y + this.speed;
        break;
      case 'left':
        // newX = Math.max(0, this.x - this.speed);
        newX = this.x - this.speed;
        break;
      case 'right':
        // newX = Math.min(canvasSize - this.y, this.x + this.speed);
        newX = this.x + this.speed;
        break;
    }

    this.x = newX;
    this.y = newY;
  }

  shoot() {
    if (this.bullets.length < this.maxBullets) {
      const bullet = new BulletService(
        this.x + this.width / 2 - this.bulletWidth / 2,
        this.y + this.width / 2 - this.bulletWidth / 2,
        this.bulletWidth,
        this.bulletHeight,
        this.direction,
        this.bulletSpeed,
      );
      this.bullets.push(bullet);
    }
  }

  updateBullets(canvasSize: number) {
    this.bullets = this.bullets.filter((bullet) => {
      bullet.update(); // Обновляем координаты пули

      // Проверяем, остается ли пуля в пределах игрового поля
      return (
        bullet.x >= 0 &&
        bullet.x <= canvasSize &&
        bullet.y >= 0 &&
        bullet.y <= canvasSize
      );
    });
  }

  update() {
    // Тут можно вызывать методы move или shoot в зависимости от логики
  }
}
