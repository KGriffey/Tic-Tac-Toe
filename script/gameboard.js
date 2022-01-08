/* Gameboard Module */
const gameboard = (() => {
    'use strict';

    let _board = [];

    //cache the DOM elements
    const _resetBtn = document.querySelector('button');
    const _gameboardSquares = document.querySelectorAll('.square');

    //bind events
    _resetBtn.addEventListener('click', init);
    _gameboardSquares.forEach(square => {
        square.addEventListener("click", play);
    });

    //public functions
    function init() {
        for (let i = 0; i < 9; i++){
            _board[i] = null;
        }
        events.emit('gameboardChanged', gameboard.get());
    }

    function get() {
        return _board;
    }

    function play(player, row = 0, col = 0){
        player = 'X';
        row = 0;
        col = 0;
        if(_isValidMove(row,col)){
            _addToken(player,row,col);
            events.emit('gameboardChanged', gameboard.get());
        }
    }

    //private functions
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
