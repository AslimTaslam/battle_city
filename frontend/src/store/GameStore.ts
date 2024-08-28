import { makeAutoObservable } from 'mobx';

import {
  MenuItem,
  GameDifficulty,
  ModeItem,
  ScreenType,
} from 'src/services/Game/data';
import { GameMode } from 'src/services/Game/types';
import { levels } from 'src/services/Map/levels';

export class GameStore {
  /** Запущена ли игра. */
  inited: boolean = false;
  /** Стоит ли игра на паузе. */
  paused: boolean = false;

  //** Количество row и col для игрового поля на карте */
  numberElements = 13;

  /** Текущий игровой уровень. */
  level = 1;
  /** Игровых уровней всего (35). */
  maxLevels: number = levels.length;
  /** Режим игры. */
  mode: GameMode = ModeItem.Singleplayer;
  /** Сложность игры. */
  difficulty = GameDifficulty.Hard;

  /** Стартовое количество жизней у игроков. */
  defaultPlayerLives = 2;
  /** Стартовые апгрейды танков игроков. */
  defaultPlayerUpgradeTier = 1;

  /** Максимальное количество врагов, которые должны появиться на карте (для одиночного режима). */
  singleplayerMaxTotalEnemies = 20;
  /** Максимальное количество врагов, которые могут быть одновременно на карте (для одиночного режима). */
  singleplayerMaxActiveEnemies = 4;
  /** Задержка между спауном вражеских танков (для одиночного режима). */
  singleplayerEnemiesSpawnDelay = 2000;
  /** Максимальное количество врагов, которые должны появиться на карте (для мультиплеера). */
  multiplayerMaxTotalEnemies = 20;
  /** Максимальное количество врагов, которые могут быть одновременно на карте (для мультиплеера). */
  multiplayerMaxActiveEnemies = 6;
  /** Задержка между спауном вражеских танков (для мультиплеера). */
  multiplayerEnemiesSpawnDelay = 1000;
  /** Через сколько осуществляется попытка отспаунить танк, если соответствующее место занято. */
  tankRespawnRetryInterval = 200;
  /** Четвёртый, одиннадцатый и восемнадцатый танки появляются переливающимися (за их уничтожение дают бонус). */
  flashingEnemyTanksWithPowerups = [4, 11, 18];

  /** Текущий игровой экран. */
  screen = ScreenType.Loading;
  /** Выбранный пункт основного меню. */
  mainMenuItem: MenuItem = MenuItem.Singleplayer;

  // Таймауты
  /** Через сколько выдаст ошибку, если игровые ресурсы не загрузились. */
  loadResourcesTimeout = 60000;
  /** Сколько по времени показывается экран с названием уровня. */
  gameIntroPopupTimeout = 2000;
  /** Через сколько после уничтожения последнего вражеского танка заканчивается игровой уровень. */
  missionAccomplishedRedirectTimeout = 1000;
  /** Сколько по времени горит надпись о проигрыше. */
  gameOverPopupTimeout = 3000;
  /** Сколько по времени показывается экран с очками. */
  scoreScreenTimeout = 7000;
  /** Сколько по времени действует бонус, укрепляющий стены вокруг базы. */
  wallsPowerupDuration = 10000;
  /** Сколько по времени действует бонус, дающий неуязвимость танку игрока. */
  shieldPowerupDuration = 10000;
  /** Сколько по времени действует бонус, замораживающий на месте вражеские танки. */
  freezePowerupDuration = 10000;
  /** Время игрового цикла в мс */
  loopTimeMs = 16;

  constructor() {
    makeAutoObservable(this);
  }

  // startGame() {
  //   this.inited = true;
  //   this.paused = false;
  // }

  // stopGame() {
  //   this.inited = false;
  //   this.paused = false;
  // }

  // resetGame() {
  //   this.paused = false;
  // }

  // resetSession() {
  //   this.stopGame();
  //   this.startGame();
  // }
  setGameMode(mode: GameMode) {
    this.mode = mode;
  }

  setDifficulty(difficulty: GameDifficulty) {
    this.difficulty = difficulty;
  }
}
