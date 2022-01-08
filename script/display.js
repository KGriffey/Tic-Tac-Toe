/* Display Module */
const display = (function () {
    'use strict'

    //cache the DOM elements
    const _gameboardSquares = document.querySelectorAll('.square');
    const _resultText = document.querySelector('.result');
    const _turnText = document.querySelector('.turn');

    //bind events
    events.on('movePlaced', _move);
    events.on('gameOver', _result);
    events.on('gameStart', _init);
    events.on('turnChanged', _turn);

    //display the player's move
    function _move(playerMove) {
        for (const square of _gameboardSquares) {
            if (parseInt(square.getAttribute('data-row')) === playerMove[1] && parseInt(square.getAttribute('data-column')) === playerMove[2]) {
                square.textContent = playerMove[0];
                break;
            }
        };
    }

    //display the result
    function _result(winner = 'draw') {
        if (winner === 'draw') {
            _resultText.textContent = 'The game is a draw!';
        } else {
            _resultText.textContent = `The winner is ${winner.getName()}!`;
        }
    }

    //reset the display
    function _init() {
        for (const square of _gameboardSquares) {
            square.textContent = '';
        };
        _resultText.textContent = '';

        _turn();
    }

    //display the current player's turn
    function _turn(name = players[0].getName()) {
        _turnText.textContent = `${name}'s turn:`
    }
})();