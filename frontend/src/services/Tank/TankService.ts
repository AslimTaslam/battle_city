import { TankDirection } from './types';

export class TankService {
  x: number;
  y: number;
  speed: number;
  direction: TankDirection;
  bullets: { x: number; y: number; direction: TankDirection }[] = [];
  bulletSpeed: number = 3;
  maxBullets: number = 1;
  tankSize: number = 36;
  height: number;
  width: number;
  bulletSize: number = 5;

  constructor(
    x: number,
    y: number,
    speed: number,
    direction: TankDirection,
    tankSize: number,
    bulletSize: number,
  ) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.tankSize = tankSize;
    this.height = tankSize;
    this.width = tankSize;
    this.bulletSize = bulletSize;
  }

  move(direction: TankDirection, canvasSize: number) {
    this.direction = direction;
    console.log(canvasSize);

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
      const bullet = {
        x: this.x + this.tankSize / 2 - this.bulletSize / 2,
        y: this.y + this.tankSize / 2 - this.bulletSize / 2,
        direction: this.direction,
      };
      this.bullets.push(bullet);
    }
  }

  updateBullets(canvasSize: number) {
    this.bullets = this.bullets.filter((bullet) => {
      switch (bullet.direction) {
        case 'up':
          bullet.y -= this.bulletSpeed;
          break;
        case 'down':
          bullet.y += this.bulletSpeed;
          break;
        case 'left':
          bullet.x -= this.bulletSpeed;
          break;
        case 'right':
          bullet.x += this.bulletSpeed;
          break;
      }
      return (
        bullet.x >= 0 &&
        bullet.x <= canvasSize &&
        bullet.y >= 0 &&
        bullet.y <= canvasSize
      );
    });
  }
}
