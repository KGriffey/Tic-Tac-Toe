/* Gameboard Module */
const gameboard = (() => {
    'use strict';

    let _board = [];

    //bind events
    events.on('moveAccepted', _placeToken);
    events.on('gameReset', init);

    //public functions
    function init() {
        for (let i = 0; i < 9; i++) {
            _board[i] = null;
        }
        events.emit('gameboardChanged', gameboard.get());
    }

    function get() {
        return _board;
    }

    function _placeToken(playerMove) {
        _board[playerMove[1] * 3 + playerMove[2]] = playerMove[0];
        events.emit('gameboardChanged', gameboard.get());
    }

    return {
        init: init,
        get: get,
    };

})();
