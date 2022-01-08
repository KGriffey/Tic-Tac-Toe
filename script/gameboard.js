/* Gameboard Module */
const gameboard = (() => {
    'use strict';

    let _board = [];

    //bind events
    //events.on('playerMoved', addToken);

    function init() {
        for (let i = 0; i < 9; i++){
            _board[i] = null;
        }
        events.emit("gameboardChanged", gameboard.get);
    }

    function get() {
        return _board;
    }

    function play(player,row,col){
        if(_isValidMove(row,col)){
            _addToken(player,row,col);
            events.emit("gameboardChanged", gameboard.get);
        }
    }

    function _addToken(player,row,col) {
            _board[row*3 + col] = player;
    }

    function _isValidMove(row,col) {
        return _board[row*3 + col] === null ? true : false;
    }

    return {
        init: init,
        get: get,
        play: play
    };

})();
