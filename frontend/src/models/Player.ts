export class Player {
  x: number;
  y: number;
  size: number;
  color: string;
  lives: number;
  isShielded: boolean;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.lives = 3;
    this.isShielded = false;
  }

  move(direction: 'up' | 'down' | 'left' | 'right', step: number) {
    switch (direction) {
      case 'up':
        this.y -= step;
        break;
      case 'down':
        this.y += step;
        break;
      case 'left':
        this.x -= step;
        break;
      case 'right':
        this.x += step;
        break;
    }
  }
}
