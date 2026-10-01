export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.missedAttacks = [];
    this.placedShips = [];
  }

  placeShip(ship, x, y, isVertical = false) {
    if (isVertical && y + ship.length > this.size) return false;
    if (!isVertical && x + ship.length > this.size) return false;

    // Check collisions with existing ships
    for (let i = 0; i < ship.length; i++) {
      const checkX = isVertical ? x : x + i;
      const checkY = isVertical ? y + i : y;
      if (this.grid[checkY][checkX] !== null) return false;
    }

    // Place ship across coordinates
    for (let i = 0; i < ship.length; i++) {
      const placeX = isVertical ? x : x + i;
      const placeY = isVertical ? y + i : y;
      this.grid[placeY][placeX] = ship;
    }

    this.placedShips.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    const target = this.grid[y][x];

    // Already attacked location
    if (target === 'miss' || target === 'hit') {
      return false;
    }

    if (target === null) {
      this.grid[y][x] = 'miss';
      this.missedAttacks.push({ x, y });
      return 'miss';
    }

    // Direct hit
    target.hit();
    this.grid[y][x] = 'hit';
    return 'hit';
  }

  allSunk() {
    return this.placedShips.length > 0 && this.placedShips.every(ship => ship.isSunk());
  }

  placeRandomShip(ship) {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * this.size);
      const y = Math.floor(Math.random() * this.size);
      const isVertical = Math.random() < 0.5;
      placed = this.placeShip(ship, x, y, isVertical);
    }
  }
}