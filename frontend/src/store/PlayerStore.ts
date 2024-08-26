import { makeAutoObservable } from 'mobx';

import TankService from 'src/services/Tank';
import { TankDirection } from 'src/services/Tank/types';

export class PlayerStore {
  players: TankService[] = [];
  tankSize: number = 36;
  bulletSize: number = 5;
  firstPlayerStartCoordinats = { x: 200, y: 550 };
  secondPlayerStartCoordinats = { x: 300, y: 550 };
  tankSpeed = 5;
  defaultDirection: TankDirection = 'up';

  constructor() {
    makeAutoObservable(this);
  }

  initializePlayers(isMultiplayer: boolean) {
    this.players = [
      new TankService(
        this.firstPlayerStartCoordinats.x,
        this.firstPlayerStartCoordinats.y,
        this.tankSpeed,
        this.defaultDirection,
        this.tankSize,
        this.bulletSize,
      ),
    ]; // Первый игрок
    if (isMultiplayer) {
      this.players.push(
        new TankService(
          this.secondPlayerStartCoordinats.x,
          this.secondPlayerStartCoordinats.y,
          this.tankSpeed,
          this.defaultDirection,
          this.tankSize,
          this.bulletSize,
        ),
      ); // Второй игрок
    }
  }

  movePlayer(id: number, direction: TankDirection, canvasSize: number) {
    const player = this.players[id];
    if (player) {
      player.move(direction, canvasSize);
    }
  }

  shootPlayer(id: number) {
    const player = this.players[id];
    if (player) {
      player.shoot();
    }
  }

  updateBullet(canvasSize: number) {
    this.players.forEach((player) => player.updateBullets(canvasSize));
  }
}
export const playerStore = new PlayerStore();
