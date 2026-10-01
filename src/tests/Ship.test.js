import { Ship } from '../modules/Ship.js';

describe('Ship Factory / Class', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('initializes with correct length and 0 hits', () => {
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
  });

  test('hit() increments hit count', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk() returns false when hits < length', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() returns true when hits equal length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});