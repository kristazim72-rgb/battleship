import { Gameboard } from '../modules/Gameboard.js';
import { Ship } from '../modules/Ship.js';

describe('Gameboard Class', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test('places ship at specific coordinates horizontally', () => {
    const ship = new Ship(3);
    const placed = board.placeShip(ship, 0, 0, false);
    expect(placed).toBe(true);
    expect(board.grid[0][0]).toBe(ship);
    expect(board.grid[0][1]).toBe(ship);
    expect(board.grid[0][2]).toBe(ship);
  });

  test('prevents ship placement outside board boundaries', () => {
    const ship = new Ship(4);
    const placed = board.placeShip(ship, 8, 0, false);
    expect(placed).toBe(false);
  });

  test('receiveAttack calls hit() on ship when targeted correctly', () => {
    const ship = new Ship(2);
    board.placeShip(ship, 2, 2, false);
    const result = board.receiveAttack(2, 2);
    expect(result).toBe('hit');
    expect(ship.hits).toBe(1);
  });

  test('receiveAttack records missed attacks', () => {
    const result = board.receiveAttack(5, 5);
    expect(result).toBe('miss');
    expect(board.missedAttacks).toContainEqual({ x: 5, y: 5 });
  });

  test('allSunk reports true when all placed ships are sunk', () => {
    const ship1 = new Ship(1);
    const ship2 = new Ship(1);
    board.placeShip(ship1, 0, 0, false);
    board.placeShip(ship2, 5, 5, false);

    board.receiveAttack(0, 0);
    board.receiveAttack(5, 5);

    expect(board.allSunk()).toBe(true);
  });
});