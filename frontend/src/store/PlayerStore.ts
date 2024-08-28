import { makeAutoObservable } from 'mobx';

import TankService from 'src/services/Tank';
import { Direction } from 'src/services/Tank/types';

export class PlayerStore {
  players: TankService[] = [];
  height = 36;
  width = 36;
  color = 'red';
  bulletSize: number = 5;
  firstPlayerStartCoordinats = { x: 200, y: 550 };
  secondPlayerStartCoordinats = { x: 300, y: 550 };
  tankSpeed = 1;
  defaultDirection: Direction = 'up';

  constructor() {
    makeAutoObservable(this);
  }

  initializePlayers(players: TankService[]) {
    this.players = players;
  }

  movePlayer(id: number, direction: Direction) {
    const player = this.players[id];
    if (player) {
      player.move(direction);
    }
  }

  shootPlayer(id: number) {
    const player = this.players[id];
    if (player) {
      player.shoot();
    }
  }

  updateBullets(canvasSize: number) {
    this.players.forEach((player) => player.updateBullets(canvasSize));
  }

  updateStartCoordinates(canvasSize: number) {
    this.firstPlayerStartCoordinats.x = canvasSize / 2 - (canvasSize / 13) * 2;
    this.firstPlayerStartCoordinats.y =
      canvasSize - (canvasSize / 100 + this.height);
    this.secondPlayerStartCoordinats.x =
      canvasSize / 2 + (canvasSize / 13) * 2 - this.width;
    this.secondPlayerStartCoordinats.y =
      canvasSize - (canvasSize / 100 + this.height);
  }
}
export const playerStore = new PlayerStore();
