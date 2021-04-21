//game status element
const statusDisplay = document.querySelector('.display_player');
//track the current player
let currentPlayer = "X";
//track played ceclls and validate game state
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

//endgame messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//these are the cases in which occupancies of the gameState determine if somebody has won
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedEvent, clickedEventIndex){
    gameState[clickedEventIndex] = currentPlayer;
    clickedEvent.innerHTML = currentPlayer; //change the UI to reflect player has selected this span
}
function handlePlayerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation(){
    let winnerDeclared=false;
    for (let i = 0; i <= 7; ++i){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b=== '' || c === ''){
            continue;
        }
        if (a ===b && b ===c){
            roundWon = true;
            break;
        }
    }
    if (roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
function handleCellClick(clickedEvent){
    //save the clicked html element
    const clickedEvent = clickedEvent.target;
    const clickedEventIndex = parseInt(clickedEvent.getAttribute('cell-index'));

    if(gameState[clickedEventIndex] != "" || !gameActive){
        return;
    }

    handleCellPlayed(clickedEvent, clickedEventIndex);
    handleResultValidation();
}
function handleRestartGame(){
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML('.xo')
                 .forEach(span => span.innerHTML="");
}


document.querySelectorAll('.xo').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.reset').addEvenetListener('click', handleRestartGame);