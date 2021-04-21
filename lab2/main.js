//game status element
const playerDisplay = document.querySelector('#display_player');
const statusDisplay = document.querySelector('#display_status');
const scoreDisplay = document.querySelector('#display_score');
//track the current player
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;
//track played cells and validate game state
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let cpuMode = false;

//endgame messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `${currentPlayer}`;

// console.log(statusDisplay.innerHTML);

//these are the cases in which occupancies of the gameState determine if somebody has won
const winPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// document.getElementsByClassName('display_player').innerHTML = currentPlayerTurn();
// statusDisplay.innerHTML = currentPlayerTurn();

const handleCellClick = clickedEvent => {
    //save the clicked html element
    clickedEvent = clickedEvent.target;
    const clickedEventIndex = parseInt(clickedEvent.getAttribute('id')) - 1;
    // console.log(gameState[clickedEventIndex]);
    console.log(clickedEvent);

    if(gameState[clickedEventIndex] !== "" || !gameActive){
        return;
    }

    handleCellPlayed(clickedEvent, clickedEventIndex);
    handleResultValidation();
    handlePlayerChange();
}

const handleCellPlayed = (clickedEvent, clickedEventIndex) => {
    gameState[clickedEventIndex] = currentPlayer;
    // console.log(clickedEvent);
    clickedEvent.innerHTML = "<span class=\"xo\">" + currentPlayer + "</span>"; //change the UI to reflect player has selected this span
}

const handlePlayerChange = async () => {
    if (!gameActive) return;

    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    playerDisplay.innerHTML = currentPlayerTurn();

    if (cpuMode) {
        let available = [];
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === "") {
                available.push(i); 
            }
        }

        console.log(available);
        let index = Math.floor(Math.random() * available.length);
        console.log(available[index]);

        await sleep(1000);

        handleCellPlayed(document.getElementById(available[index] + 1), available[index]);
        handleResultValidation();
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        playerDisplay.innerHTML = currentPlayerTurn();
    }
}

const handleResultValidation = () => {
    let winnerDeclared = false;
    let roundWon = false;
    for (let i = 0; i <= 7; ++i){
        const winCondition = winPositions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b ===c){
            roundWon = true;
            break;
        }
    }
    if (roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        (currentPlayer === 'X') ? scoreX++ : scoreO++;
        scoreDisplay.innerHTML = `X: ${scoreX} O: ${scoreO}`;
        console.log('victory');
        console.log(currentPlayer);
        return;
    }
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
}

const handleReset = clickedButton => {
    scoreX = 0;
    scoreO = 0;
    handleNewGame(clickedButton);
    // document.getElementsByClassName('.xo').forEach(span => span.innerHTML="");
}

const handleNewGame = clickedButton => {
    console.log(clickedButton.target);
    console.log(clickedButton.target.getAttribute('type'));
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerHTML = "Let's play!";
    scoreDisplay.innerHTML = `X: ${scoreX} O: ${scoreO}`;
    playerDisplay.innerHTML = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    let cells = document.getElementsByClassName("xo"); // Creates an HTMLObjectList not an array.

    Array.prototype.forEach.call(cells, cell => {
        cell.innerHTML = "";
    });

    clickedButton.target.getAttribute('type') === "cpu" ? cpuMode = 1 : cpuMode = 0;
}

let listener_cells = document.getElementsByClassName("cell");
Array.prototype.forEach.call(listener_cells, cell => {
        cell.addEventListener('click', handleCellClick);
});
// console.log(listener_cells);
// document.querySelectorAll('.xo').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.reset').addEventListener('click', handleReset);
document.querySelector('.new_game').addEventListener('click', handleNewGame);
document.querySelector('.cpu').addEventListener('click', handleNewGame);