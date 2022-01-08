/* Player Factory */
const Player = (name, token) => {
    //cache the DOM elements
    const _gameboardSquares = document.querySelectorAll('.square');

    //bind events
    _gameboardSquares.forEach(square => {
        square.addEventListener("click", _move);
    });

    //Emit the player's move and pass: token, row, col
    function _move(e) {
        events.emit('playerMove', [parseInt(e.target.getAttribute('data-row')), parseInt(e.target.getAttribute('data-column'))]);
    }
};