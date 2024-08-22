import { Cell } from './data';
import { levels } from './levels';
import { GameElement } from './types';

export class MapService {
  private elements: GameElement[] = [];
  constructor() {}

  initializeLevel(levelIndex: number, elementSize: number = 50) {
    const levelMap = levels[levelIndex];

    this.elements = []; // Очищаем элементы перед генерацией

    for (let row = 0; row < levelMap.length; row++) {
      for (let col = 0; col < levelMap[row].length; col++) {
        const cellType = levelMap[row][col];
        const element = this.createElement(
          cellType,
          col * elementSize,
          row * elementSize,
          elementSize,
        );
        if (element) {
          this.elements.push(element);
        }
      }
    }
  }

  private createElement(
    cellType: Cell,
    x: number,
    y: number,
    elementSize: number,
  ): GameElement | null {
    switch (cellType) {
      case Cell.Brick:
        return {
          x,
          y,
          height: elementSize,
          width: elementSize,
          color: 'brown',
        }; // Полный кирпичный блок
      case Cell.BrickTop:
        return {
          x,
          y,
          height: elementSize / 2,
          width: elementSize,
          color: 'brown',
        }; // Верхняя половина кирпичного блока
      case Cell.BrickBottom:
        return {
          x,
          y: y + elementSize / 2,
          height: elementSize / 2,
          width: elementSize,
          color: 'brown',
        }; // Нижняя половина кирпичного блока
      case Cell.BrickLeft:
        return {
          x,
          y,
          height: elementSize,
          width: elementSize / 2,
          color: 'brown',
        }; // Левая половина кирпичного блока
      case Cell.BrickRight:
        return {
          x: x + elementSize / 2,
          y,
          height: elementSize,
          width: elementSize / 2,
          color: 'brown',
        }; // Правая половина кирпичного блока
      case Cell.BrickBottomLeft:
        return {
          x,
          y: y + elementSize / 2,
          height: elementSize / 2,
          width: elementSize / 2,
          color: 'brown',
        }; // Нижняя левая четверть
      case Cell.BrickBottomRight:
        return {
          x: x + elementSize / 2,
          y: y + elementSize / 2,
          height: elementSize / 2,
          width: elementSize / 2,
          color: 'brown',
        }; // Нижняя правая четверть
      case Cell.Concrete:
        return { x, y, height: elementSize, width: elementSize, color: 'gray' }; // Полный бетонный блок
      case Cell.ConcreteTop:
        return {
          x,
          y,
          height: elementSize / 2,
          width: elementSize,
          color: 'gray',
        }; // Верхняя половина бетонного блока
      case Cell.ConcreteBottom:
        return {
          x,
          y: y + elementSize / 2,
          height: elementSize / 2,
          width: elementSize,
          color: 'gray',
        }; // Нижняя половина бетонного блока
      case Cell.ConcreteLeft:
        return {
          x,
          y,
          height: elementSize,
          width: elementSize / 2,
          color: 'gray',
        }; // Левая половина бетонного блока
      case Cell.ConcreteRight:
        return {
          x: x + elementSize / 2,
          y,
          height: elementSize,
          width: elementSize / 2,
          color: 'gray',
        }; // Правая половина бетонного блока
      case Cell.ConcreteBottomLeft:
        return {
          x,
          y: y + elementSize / 2,
          height: elementSize / 2,
          width: elementSize / 2,
          color: 'gray',
        }; // Нижняя левая четверть бетонного блока
      case Cell.ConcreteBottomRight:
        return {
          x: x + elementSize / 2,
          y: y + elementSize / 2,
          height: elementSize / 2,
          width: elementSize / 2,
          color: 'gray',
        }; // Нижняя правая четверть бетонного блока
      case Cell.Forest:
        return {
          x,
          y,
          height: elementSize,
          width: elementSize,
          color: 'green',
        }; // Трава
      case Cell.Water:
        return { x, y, height: elementSize, width: elementSize, color: 'blue' }; // Вода
      case Cell.Ice:
        return {
          x,
          y,
          height: elementSize,
          width: elementSize,
          color: 'lightblue',
        }; // Лёд
      case Cell.Base:
        return {
          x,
          y,
          height: elementSize,
          width: elementSize,
          color: 'yellow',
        }; // Штаб
      case Cell.Blank:
      default:
        return null; // Пустые клетки не отображаются
    }
  }

  public getElements(): GameElement[] {
    return this.elements;
  }
}
