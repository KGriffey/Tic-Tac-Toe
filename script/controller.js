/* Controller Module */
const controller = (() => {
    'use strict'

    //cache the DOM elements
    const _gameboardSquares = document.querySelectorAll(".square");
    const _resetBtn = document.querySelector("button");

    //bind events
    events.on("gameboardChanged", _display);

    function _display(gameboard) {
        //display the gameboard
    }

});