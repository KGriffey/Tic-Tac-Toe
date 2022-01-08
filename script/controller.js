/* Controller Module */
const controller = (function () {
    'use strict'

    let isGameOver = false;
    let playerTurn = true;
    let turnNum = 0;

    //cache the DOM elements
    const _resetBtn = document.querySelector('.resetBtn');
    const _gameboardSquares = document.querySelectorAll('.square');

    //bind events
    _resetBtn.addEventListener("click", _resetGame);
    events.on('playerMoved', _play);

    function _play(playerMove) {
        //If the game is already over, do nothing
        if (isGameOver === true){
            return;
        }

        //Check if the move is valid before palying it. Otherwise, do nothing
        if (_isValidMove(playerMove)) {
            events.emit('moveAccepted', [_currPlayerToken(), playerMove[0], playerMove[1]]);
        } else {
            return;
        }

        //Check for a winner, tie, or continue the game
        if (_isWinner(playerMove)) {
            isGameOver = true;
            events.emit('gameOver', _currPlayerToken());
        } else if (_isTie()) {
            isGameOver = true;
            events.emit('gameOver');
        } else {
            _incTurn();
            _toggleTurn();
        }
    }

    function _isValidMove(playerMove) {
        return gameboard.get()[playerMove[0] * 3 + playerMove[1]] === null ? true : false;
    }

    function _currPlayerToken() {
        return playerTurn === true ? 'X' : 'O';
    }

    function _toggleTurn() {
        playerTurn = !playerTurn;
    }

    function _incTurn() {
        turnNum++;
    }

    function _resetGame() {
        playerTurn = true;
        turnNum = 0;
        isGameOver = false;
        events.emit('gameReset');
    }

    function _isWinner(playerMove) {
        //Get the gameboard and parse the move
        const board = gameboard.get();
        const row = playerMove[0];
        const col = playerMove[1];

        //Check the column
        for (let i = 0; i < 3; i++) {
            if (board[col + 3 * i] != _currPlayerToken()) {
                break;
            }
            if (i == 2) {
                return true;
            }
        }

        //Check the row
        for (let i = 0; i < 3; i++) {
            if (board[i + 3 * row] != _currPlayerToken()) {
                break;
            }
            if (i == 2) {
                return true;
            }
        }

        //Check the descending diag
        if (row === col) {
            for (let i = 0; i < 3; i++) {
                if (board[i * 2 + i * 2] != _currPlayerToken()) {
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
                if (board[i * 2 + 2] != _currPlayerToken()) {
                    break;
                }
                if (i == 2) {
                    return true;
                }
            }
        }
    }

    function _isTie() {
        return turnNum === 8 ? true : false;
    }
})();