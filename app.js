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
    //Set the value of original board equal to an array with 9 keys in each index in the array 
    //[0, 1, 2, 3, 4, 5, 6, 7, 8]
    //The array.length is 9 because of the 9 spots in the table
    //each index represents the possible combinations of wins in the winCombos nested array
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
    //the board is the array of numbers set above
    // console.log('this is the board', 'which is a(n)', typeof origBoard)
    //square.target.id targets the number assigned to each square in the array board
    // console.log('this is the square.target.id', 'which is a(n)', typeof [square.target.id])
    //in order to grab the number assigned to the squares in the array of numbers
    //use [bracket notation] to get the number out of the array of arrays (called origBoard)
    // console.log('this is both put together', 'which is a(n)', typeof origBoard[square.target.id])
    //if the type original board's target.id is equal == to number
    if (typeof origBoard[square.target.id] == 'number') {
        //run the turn() function and pass in the number of the square and human player 'O' as arguments
        //we want the human player to make a move, then the AI will make the next move
        turn(square.target.id, huPlayer)
        //AND if the check tie function is false
        //if the Tie function is false then the AI will makes it's move
        if (!checkTie())
        //run the turn() function WITH bestSpot() function and AI player as an argument
        //After the human player makes it's move , and there isn't a tie, then the AI can turn
            turn(bestSpot(), aiPlayer)
            // console.log(bestSpot())
    }

}

//===========  TURN  =============//

//This turn function has squareId and player passed as arguments
//squareId has the value of origBoard[square.target.id]
//player has the value of both the human player and the AI player
function turn(squareId, player) {
    //origBoard[squareId] is an index number. The index number is the position of the cell in the array
    //In this line, we are setting that index number equal to the player (X or O)
    origBoard[squareId] = player;
    //then get the element by squareId (which is also a number) 
    //grab the inner text of that id and set it to the player as well (X or O)
    document.getElementById(squareId).innerText = player;
    //this line is assigning gameWon variable to the checkWin function with 2 arguments
    //the original and the player
    // the original board is the array that was set up earlier
    //and player now has the value of the index # and the id# assigned to X or O
    let gameWon = checkWin(origBoard, player)
    //if the game is won
    if (gameWon) 
    //run the game over function
    gameOver(gameWon)
}

// =========== CHECKWIN =========//

function checkWin(board, player) {
    //store the variable 
    let plays = board.reduce((accum, currentVal, index) =>
    (currentVal === player) ? accum.concat(index) : accum, [])
    //store variable
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

