export type GameMode = 'SINGLEPLAYER' | 'MULTIPLAYER';

export enum ModeItem {
  Singleplayer = 'SINGLEPLAYER',
  Multiplayer = 'MULTIPLAYER',
}

export enum GameDifficulty {
  Easy = 0,
  Hard = 1,
}

export enum ScreenType {
  Loading = 'LOADING',
  MainMenu = 'MAIN_MENU',
  LevelSelector = 'LEVEL_SELECTOR',
  GameStart = 'GAME_START',
  Pause = 'PAUSE',
  Score = 'SCORE',
  GameOverPopup = 'GAME_OVER_POPUP',
}
