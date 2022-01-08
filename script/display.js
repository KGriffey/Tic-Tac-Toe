/* Display Module */
const display = (function () {
    'use strict'

    //cache the DOM elements
    const _gameboardSquares = document.querySelectorAll('.square');
    const _resultText = document.querySelector('.result');

    //bind events
    events.on('movePlaced', _move);
    events.on('gameOver', _result);
    events.on('gameReset', _reset)

    function _move(playerMove) {
        for (const square of _gameboardSquares) {
            if (parseInt(square.getAttribute('data-row')) === playerMove[1] && parseInt(square.getAttribute('data-column')) === playerMove[2]) {
                square.textContent = playerMove[0];
                break;
            }
        };
    }

    function _result(winner = 'draw') {
        if (winner === 'draw') {
            _resultText.textContent = 'The game is a draw!';
        } else {
            for (const player of players) {
                if (winner === player.getToken()){
                    _resultText.textContent = `The winner is ${player.getName()}!`;
                }
            }
        }
    }

    function _reset() {
        for (const square of _gameboardSquares) {
            square.textContent = '';
        };
        _resultText.textContent = '';
    }
})();