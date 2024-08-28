import { playerStore, PlayerStore } from 'src/store/PlayerStore';
import { Direction } from 'src/services/Tank/types';
import TankService from 'src/services/Tank';
import CollisionService from 'src/services/Collision';
import { GameMode } from 'src/services/Game/types';
import { ModeItem } from 'src/services/Game/data';

export class PlayerService {
  private playerStore: PlayerStore;
  private collisionService: CollisionService;

  constructor(collisionService: CollisionService) {
    this.playerStore = playerStore;
    this.collisionService = collisionService;
  }

  initializePlayers(isMultiplayer: GameMode) {
    const baseCharacteristics = {
      height: playerStore.height,
      width: playerStore.width,
      color: playerStore.color,
      speed: playerStore.tankSpeed,
      direction: playerStore.defaultDirection,
    };
    const players = [
      new TankService(
        {
          x: playerStore.firstPlayerStartCoordinats.x,
          y: playerStore.firstPlayerStartCoordinats.y,
          ...baseCharacteristics,
        },
        this.collisionService,
      ),
    ]; // Первый игрок
    if (isMultiplayer === ModeItem.Multiplayer) {
      players.push(
        new TankService(
          {
            x: playerStore.secondPlayerStartCoordinats.x,
            y: playerStore.secondPlayerStartCoordinats.y,
            ...baseCharacteristics,
          },
          this.collisionService,
        ),
      ); // Второй игрок
    }
    this.playerStore.initializePlayers(players);
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

  updateBullets(canvasSize: number) {
    playerStore.updateBullets(canvasSize);
  }

  updateStartCoordinates(canvasSize: number) {
    playerStore.updateStartCoordinates(canvasSize);
  }
}
