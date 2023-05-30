const statusDisplay = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const tieMessage = () => `Tie Game!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function PlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let tieGame = !gameState.includes("");
    if (tieGame) {
        statusDisplay.innerHTML = tieMessage();
        gameActive = false;
        return;
    }

    PlayerChange();
}

function handleBlockClick(clickedBlockEvent) {
    const clickedBlock = clickedBlockEvent.target;
    const clickedBlockIndex = parseInt(
        clickedBlock.getAttribute('data-cell')
    );
    if (gameState[clickedBlockIndex] !== "" || !gameActive) {
        return;
    }
    handleBlockPlayed(clickedBlock, clickedBlockIndex);
    handleResultValidation();
}

function handleBlockPlayed(clickedBlock, clickedBlockIndex) {
    gameState[clickedBlockIndex] = currentPlayer;
    clickedBlock.innerHTML = currentPlayer;
}

function RestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.block').forEach(block => block.innerHTML = "");
}




document.querySelectorAll('.block').forEach(block => block.addEventListener('click', handleBlockClick));
document.querySelector('.restart').addEventListener('click', RestartGame);