import BulletService from 'src/services/Bullet';
import { GameElement } from 'src/models/GameElement';
import { GameElementItem } from 'src/services/Game/data';
import { Direction, TankCharacteristics } from './types';
import CollisionService from '../Collision';

export class TankService extends GameElement {
  speed: number;
  direction: Direction;
  bullets: BulletService[] = [];
  bulletSpeed: number = 5;
  bulletWidth: number = 5;
  bulletHeight: number = 5;
  maxBullets: number = 1;
  collisionService: CollisionService;

  constructor(
    tankCharacteristics: TankCharacteristics,
    collisionService: CollisionService,
  ) {
    super(
      GameElementItem.Tank,
      tankCharacteristics.x,
      tankCharacteristics.y,
      tankCharacteristics.height,
      tankCharacteristics.width,
      tankCharacteristics.color,
    );
    this.collisionService = collisionService;
    this.speed = tankCharacteristics.speed;
    this.direction = tankCharacteristics.direction;
  }

  canMove(newX: number, newY: number): boolean {
    const tempTank = {
      x: newX,
      y: newY,
      height: this.height,
      width: this.width,
      type: 'tank',
      color: this.color,
    };

    if (this.collisionService.checkCollisionWithObstacles(tempTank)) {
      return false;
    }

    return true;
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

    if (this.canMove(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
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
