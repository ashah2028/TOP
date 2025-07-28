// Key elements from the DOM
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.game-message');
const restartButton = document.querySelector('.restart-button');

// State Variables
let currentPlayer = "X";
let board = ["","", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleCellClick(e){
  const cell = e.target;
  const index = cell.getAttribute('data-cell-index');

  if (board[index] != "" || !isGameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();

}

function checkWinner(){
  let roundWon = false;

  for(let combo of winningCombos){
    const [a, b, c] = combo;
    // const a = combo [0]....
    if (board[a] && board[a] === board[b] && board[a] === board[c]){
      roundWon = true;
      break;
    }
  }

  if (roundWon){
    message.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if(!board.includes("")){
    message.textContent = "It's a tie!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `${currentPlayer}'s turn`;

}

function restartGame(){
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  message.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");

}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
