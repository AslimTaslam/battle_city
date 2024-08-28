export type Direction = 'up' | 'down' | 'left' | 'right';

export interface TankCharacteristics {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  speed: number;
  direction: Direction;
}
