export type GameMode = 'SINGLEPLAYER' | 'MULTIPLAYER';

export type GameElementType = 'obstacle' | 'tank' | 'bullet';

export abstract class GameElement {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  type: GameElementType;

  constructor(
    type: GameElementType,
    x: number,
    y: number,
    height: number,
    width: number,
    color: string,
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.type = type;
  }

  abstract update(): void;

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
