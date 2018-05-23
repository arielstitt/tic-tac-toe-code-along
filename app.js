// Basic Setup
// setup some variables
//click a square and show a mark

//initialize the gameboard
let origBoard;

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
    document.querySelector('.endgame').style.display = 'none'
    //make the array from every number from 0 to 9
    origBoard = Array.from(Array(9).keys())
    //remove the Xs and Os from the board
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = ''
        cells[i].style.removeProperty('background-color')
        cells[i].addEventListener('click', turnClick, false)
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer)
        if (!checkTie())
            turn(bestSpot(), aiPlayer)
    }

}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}

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
}

function declareWinner(who) {
    document.querySelector('..endgame').style.display = 'block'
    document.querySelector('.endgame .text').innerText = who
}

function emptySquares(){
    return origBoard.filter(s => typeof s == 'number')
}

//=======BEST SPOT============//
//this is how we're going to find the spot the ai player is going to play
function bestSpot() {
    return emptySquares()[0]
}

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