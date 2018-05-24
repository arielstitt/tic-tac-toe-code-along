// Basic Setup
// setup some variables
//click a square and show a mark

//initialize the gameboard
let origBoard;
//set the values of human player to O and aiplayer to X
const huPlayer = 'O'
const aiPlayer = 'X'

//set an array for the winning combonation 
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]
//selects each element that has the class of cell 
const cells = document.querySelectorAll('.cell')

//create a function that starts the game
startGame();

//=============START GAME===========//

function startGame() {
    //Grabs the element with the class of endgame and sets the style to display none
    //When the game is started the board will clear out
    document.querySelector('.endgame').style.display = 'none'
    //Set the value of original board equal to an array with 9 keys in each index in the array [1, 2, 3, 4, 5, 6, 7, 8, 9]
    //The array is 9 because of the 9 spots in the table
    origBoard = Array.from(Array(9).keys())
    //remove the Xs and Os from the board
    //Loop through the cells
    for (var i = 0; i < cells.length; i++) {
        //grab each cell and set the text to an empty string
        cells[i].innerText = ''
        //grab each cell and remove the background color
        cells[i].style.removeProperty('background-color')
        //grab each cell and add the event listener 'click'
        //inside the event listener add the turn click function and set it to false.
        // turn click
        //false prevents the player from being able to continuously click the board after a winner is declared
        cells[i].addEventListener('click', turnClick, false)
    }
}
// =========== TURN CLICK ======== //

function turnClick(square) {
    console.log(square)
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer)
        if (!checkTie())
            turn(bestSpot(), aiPlayer)
    }

}

//===========  TURN  =============//
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}

// =========== CHECKWIN =========//
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, [])
    let gameWon = null
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon
}
//============GAME OVER ===============//
function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == huPlayer ? 'blue' : 'red'
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false)
    }
    declareWinner(gameWon.player == huPlayer ? "you win" : "you loose")
}

// ====== DECLARE WINNER ======== //

function declareWinner(who) {
    document.querySelector('.endgame').style.display = 'block'
    document.querySelector('.endgame .text').innerText = who
}

// ======= EMPTY SQUARES =========//

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number')
}

//=======BEST SPOT============//
//this is how we're going to find the spot the ai player is going to play

function bestSpot() {
    return emptySquares()[0]
}

// ===========  CHECK TIE ========//

function checkTie(){
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i ++){
            cells[i].style.backgroundColor = "green"
            cells[i].removeEventListener('click', turnClick, false)
        }
        declareWinner('tie game')
        return true
    }
    return false
}

//determine a winner
//set up logic to determine the winner


//Basic AI and winner notification
//notify who the winner is



//minimax algorithm
//create an unbeatable ai