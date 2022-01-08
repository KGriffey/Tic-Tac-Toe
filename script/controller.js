/* Controller Module */
const controller = (function () {
    'use strict'

    let winner = '';
    let turn = true;

    //cache the DOM elements
    const resetBtn = document.querySelector('.resetBtn');

    //bind events
    resetBtn.addEventListener("click", _resetGame);
    events.on('playerMove', _play);

    function _play(playerMove) {
        //Check if the move is valid before palying it. Otherwise, do nothing.
        if (_isValidMove(playerMove[0], playerMove[1])) {
            events.emit('moveAccepted', [_currPlayerToken(), playerMove[0], playerMove[1]]);
            _toggleTurn();
        } else {
            return;
        }

        if (_checkForWinner) {

        }
    }

    function _isValidMove(row, col) {
        return gameboard.get()[row * 3 + col] === null ? true : false;
    }

    function _currPlayerToken() {
        return turn === true ? 'X' : 'O';
    }

    function _toggleTurn() {
        turn = !turn;
    }

    function _resetGame() {
        turn = true;
        events.emit('gameReset');
    }

    function _checkForWinner() {

    }

})();