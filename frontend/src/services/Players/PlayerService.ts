import { playerStore, PlayerStore } from 'src/store/PlayerStore';
import { Direction } from 'src/services/Tank/types';

export class PlayerService {
  private playerStore: PlayerStore;

  constructor() {
    this.playerStore = playerStore;
  }

  initializePlayers(isMultiplayer: boolean) {
    this.playerStore.initializePlayers(isMultiplayer);
  }

  movePlayer(id: number, direction: Direction, canvasSize: number) {
    this.playerStore.movePlayer(id, direction, canvasSize);
  }

  shootPlayer(id: number) {
    this.playerStore.shootPlayer(id);
  }

  getPlayerElements() {
    return this.playerStore.players.map((player) => ({
      x: player.x,
      y: player.y,
      width: player.width,
      height: player.height,
      color: player.color,
      bullets: player.bullets.map((bullet) => ({
        x: bullet.x,
        y: bullet.y,
        width: bullet.width,
        height: bullet.height,
        color: bullet.color,
      })),
    }));
  }
}
