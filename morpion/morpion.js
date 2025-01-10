const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset');
const statusText = document.querySelector('.status');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWinner()) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWinner()) {
        statusText.textContent = `Le joueur ${currentPlayer} a gagné !`;
        return;
    }

    if (!gameState.includes('')) {
        statusText.textContent = 'Match nul !';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `C'est au tour de ${currentPlayer}`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    statusText.textContent = `C'est au tour de ${currentPlayer}`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

document.addEventListener("DOMContentLoaded", () => {
    const openRulesBtn = document.getElementById("open-rules");
    const modal = document.getElementById("rules-modal");
    const closeModal = document.querySelector(".modal .close");

    openRulesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex"; 
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
