# battleship
Battleship is a web-based implementation of the classic two-player strategy game, developed as part of **The Odin Project** curriculum. 

The primary goal of this project is to practice **Test-Driven Development (TDD)** in JavaScript using Jest. The application architecture strictly decouples pure game logic (handling hit detection, board tracking, and win conditions) from the User Interface (DOM rendering and user interactions).

### Game Rules
- The game is played on two 10x10 grids: one for your fleet and one for tracking attacks on the computer's fleet.
- Each player automatically places a fleet of ships of varying lengths onto their grid.
- Players take turns calling out target coordinates on the opponent's grid.
- Hits and misses are recorded visually on the board.
- The first player to sink all opposing ships wins the match.
