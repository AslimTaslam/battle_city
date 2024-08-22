import { playerStore, PlayerStore } from 'src/store/PlayerStore';
import { TankDirection } from '../Tank/types';

export class PlayerService {
  private playerStore: PlayerStore;

  constructor() {
    this.playerStore = playerStore;
  }

  initializePlayers(isMultiplayer: boolean) {
    this.playerStore.initializePlayers(isMultiplayer);
  }

  movePlayer(id: number, direction: TankDirection, canvasSize: number) {
    this.playerStore.movePlayer(id, direction, canvasSize);
  }

  shootPlayer(id: number) {
    this.playerStore.shootPlayer(id);
  }

  getPlayerElements() {
    return this.playerStore.players.map((player) => ({
      x: player.x,
      y: player.y,
      width: playerStore.tankSize,
      height: playerStore.tankSize,
      color: 'red',
      bullets: player.bullets.map((bullet) => ({
        x: bullet.x,
        y: bullet.y,
        width: playerStore.bulletSize,
        height: playerStore.bulletSize,
        color: 'yellow',
      })),
    }));
  }
}
