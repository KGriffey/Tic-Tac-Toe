/* Controller Module */
const controller = (function () {
    'use strict'

    //variables that control the flow of the game
    let turnNum = 0;
    let isGameOver = false;
    let currPlayer = null;
    
    //cache the DOM elements
    const _resetBtn = document.querySelector('.resetBtn');

    //bind events
    _resetBtn.addEventListener("click", startGame);
    events.on('playerMoved', _play);

    function _play(playerMove) {
        //If the game is already over, do nothing
        if (isGameOver === true){
            return;
        }

        //Check if the move is valid, else do nothing
        if (_isValidMove(playerMove)) {
            events.emit('moveAccepted', [currPlayer.getToken(), playerMove[0], playerMove[1]]);
        } else {
            return;
        }

        //Check for a winner, tie, or continue the game by updating controller variables
        if (_isWinner(playerMove)) {
            isGameOver = true;
            events.emit('gameOver', currPlayer);
        } else if (_isTie()) {
            isGameOver = true;
            events.emit('gameOver');
        } else {
            _incTurn();
            _toggleCurrPlayer();
        }
    }

    //check if the move is valid based on current gamestate
    function _isValidMove(playerMove) {
        return gameboard.get()[playerMove[0] * 3 + playerMove[1]] === null ? true : false;
    }

    //change to other player
    function _toggleCurrPlayer() {
        if (players.indexOf(currPlayer) === 0) {
            currPlayer = players[1];
        } else {
            currPlayer = players[0];
        }
        events.emit("turnChanged", currPlayer.getName());
    }

    //increment the turn counter
    function _incTurn() {
        turnNum++;
    }

    //check for a winner
    function _isWinner(playerMove) {
        //Get the gameboard and parse the move
        const board = gameboard.get();
        const row = playerMove[0];
        const col = playerMove[1];

        //Check the column
        for (let i = 0; i < 3; i++) {
            if (board[col + 3 * i] != currPlayer.getToken()) {
                break;
            }
            if (i == 2) {
                return true;
            }
        }

        //Check the row
        for (let i = 0; i < 3; i++) {
            if (board[i + 3 * row] != currPlayer.getToken()) {
                break;
            }
            if (i == 2) {
                return true;
            }
        }

        //Check the descending diag
        if (row === col) {
            for (let i = 0; i < 3; i++) {
                if (board[i * 2 + i * 2] != currPlayer.getToken()) {
                    break;
                }
                if (i == 2) {
                    return true;
                }
            }
        }

        //Check the ascending diag
        if (row + col === 2) {
            for (let i = 0; i < 3; i++) {
                if (board[i * 2 + 2] != currPlayer.getToken()) {
                    break;
                }
                if (i == 2) {
                    return true;
                }
            }
        }
    }

    //check for a tie
    function _isTie() {
        return turnNum === 8 ? true : false;
    }

    //start a new game
    function startGame() {
        currPlayer = players[0];
        turnNum = 0;
        isGameOver = false;
        events.emit('gameStart');
    }

    return {
        startGame: startGame
    };
})();