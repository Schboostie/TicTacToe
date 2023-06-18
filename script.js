const board = ['','','','','','','','',''];
let currentPlayer = 'X';
let gameActive = true;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const cells = Array.from(document.getElementsByClassName('cell'));
const resetButton = document.getElementById('reset-button');
const statusMessage = document.getElementById('status-message');
const scorePlayer1Element = document.getElementById('score-player1');
const scorePlayer2Element = document.getElementById('score-player2');

// Initialize the game
function initializeGame() {
  board.fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusMessage.textContent = '';
  cells.forEach(cell => cell.textContent = '');
  updateScores();
}

// Handle cell click event
function handleCellClick(clickedCell, cellIndex) {
  if (!gameActive || board[cellIndex] !== '') {
    return;
  }

  board[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  checkResult();
  changePlayer();
}

// Change the current player
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check if the game has been won or ended in a draw
function checkResult() {
  const winningPlayer = checkWin();
  if (winningPlayer) {
    endGame(winningPlayer);
  } else if (isBoardFull()) {
    endGame(null);
  }
}

// Check if any player has won
function checkWin() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Check if the board is full
function isBoardFull() {
  return board.every(cell => cell !== '');
}

// End the game and update scores
function endGame(winner) {
  gameActive = false;
  if (winner) {
    statusMessage.textContent = `Player ${winner} wins!`;
    updateScore(winner);
  } else {
    statusMessage.textContent = "It's a draw!";
  }
}

// Update the scores on the UI
function updateScores() {
  scorePlayer1Element.textContent = scorePlayer1;
  scorePlayer2Element.textContent = scorePlayer2;
}

// Update the score for the winning player
function updateScore(winner) {
  if (winner === 'X') {
    scorePlayer1++;
  } else if (winner === 'O') {
    scorePlayer2++;
  }
  updateScores();

  // Check if any player has reached the winning score of 10
  if (scorePlayer1 === 10 || scorePlayer2 === 10) {
    gameActive = false;
    statusMessage.textContent = `Player ${winner} wins the game with a score of 10!`;
  }
}

// Event listener for cell clicks
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index));
});

// Event listener for reset button click
resetButton.addEventListener('click', initializeGame);

// Initialize the game
initializeGame();
