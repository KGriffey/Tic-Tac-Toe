/* Player Factory */
const Player = (name, token) => {
    //cache the DOM elements
    const _gameboardSquares = document.querySelectorAll('.square');

    //bind events
    for (const square of _gameboardSquares) {
        square.addEventListener("click", _move);
    };

    //Emit the player's move and pass: token, row, col
    function _move(e) {
        events.emit('playerMoved', [parseInt(e.target.getAttribute('data-row')), parseInt(e.target.getAttribute('data-column'))]);
    }

    function getName() {
        return name;
    }

    function getToken() {
        return token;
    }

    return {
        getName: getName,
        getToken: getToken
    };
};