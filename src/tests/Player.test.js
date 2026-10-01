import { Player } from '../modules/Player.js';

describe('Player Class', () => {
  test('creates player with personal gameboard', () => {
    const player = new Player('real');
    expect(player.type).toBe('real');
    expect(player.gameboard).toBeDefined();
  });

  test('computer player makes valid random attacks', () => {
    const player = new Player('real');
    const computer = new Player('computer');

    const move = computer.makeRandomAttack(player.gameboard);
    expect(move).toHaveProperty('x');
    expect(move).toHaveProperty('y');
    expect(['hit', 'miss']).toContain(move.result);
  });
});