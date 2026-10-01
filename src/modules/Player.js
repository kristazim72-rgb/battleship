import { Gameboard } from './Gameboard.js';

export class Player {
  constructor(type = 'real') {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  makeRandomAttack(enemyBoard) {
    if (this.type !== 'computer') return null;

    let x, y, result;
    do {
      x = Math.floor(Math.random() * enemyBoard.size);
      y = Math.floor(Math.random() * enemyBoard.size);
      result = enemyBoard.receiveAttack(x, y);
    } while (result === false); // Repeat if location was already targeted

    return { x, y, result };
  }
}