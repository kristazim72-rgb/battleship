import { Player } from './modules/Player.js';
import { Ship } from './modules/Ship.js';
import { renderBoard } from './modules/domController.js';

let player, computer;
let gameOver = false;

const playerBoardContainer = document.querySelector('#player-board');
const computerBoardContainer = document.querySelector('#computer-board');
const statusText = document.querySelector('#status');
const randomizeBtn = document.querySelector('#randomize-btn');

function initGame() {
  player = new Player('real');
  computer = new Player('computer');
  gameOver = false;
  statusText.textContent = 'Attack the enemy board!';

  setupFleet(player.gameboard);
  setupFleet(computer.gameboard);

  updateDisplay();
}

function setupFleet(gameboard) {
  const shipLengths = [5, 4, 3, 3, 2];
  shipLengths.forEach(length => gameboard.placeRandomShip(new Ship(length)));
}

function updateDisplay() {
  renderBoard(playerBoardContainer, player.gameboard, false);
  renderBoard(computerBoardContainer, computer.gameboard, true, gameOver ? null : handlePlayerAttack);
}

function handlePlayerAttack(x, y) {
  if (gameOver) return;

  const result = computer.gameboard.receiveAttack(x, y);
  if (!result) return; // Cell was already targeted

  if (computer.gameboard.allSunk()) {
    statusText.textContent = 'Victory! You sank all enemy ships!';
    gameOver = true;
    updateDisplay();
    return;
  }

  // Computer's turn
  computer.makeRandomAttack(player.gameboard);

  if (player.gameboard.allSunk()) {
    statusText.textContent = 'Defeat! The computer sank all your ships!';
    gameOver = true;
  }

  updateDisplay();
}

randomizeBtn.addEventListener('click', () => {
  initGame();
});

initGame();