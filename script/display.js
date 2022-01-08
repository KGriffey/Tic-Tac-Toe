/* Display Module */
const display = (function () {
    'use strict'

    //cache the DOM elements
    const _gameboardSquares = document.querySelectorAll('.square');

    //bind events
    events.on('gameboardChanged', _display);

    function _display(gameboard) {
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === 'X') {
                _gameboardSquares[i].textContent = 'X';
            } else if (gameboard[i] === 'O') {
                _gameboardSquares[i].textContent = 'O';
            } else {
                _gameboardSquares[i].textContent = '';
            }
        }
    }
})();