/*-----------------------------------------To do list-----------------------------------------------------*/

/*
[x] Get a enterplayername variable, that when you change the state javascript assigns a number
[x] Every time a number is assigned create a list of forms that have option to enter data into
[x] add a utilities functions tab and link / export
[x] Make it so changing the dropdown doesnt clear the UI just adds or subtracts
[] create a table that assigns players
*/


/*----------------------------------------Main code--------------------------------------------------------*/


import { createButton, createInput, removeInput } from './utilities.js';

//grabbing number of players dynamically
let numberOfPlayers = undefined;

// helper function to change players
const changeNumberOfPlayers = input => {
    numberOfPlayers = input
};

//number of players is the entered number into dropdorn form determinging how many players to go with
let numberOfPlayersSelector = document.getElementById("player-number");

numberOfPlayersSelector.addEventListener("change", (event) => {
    changeNumberOfPlayers(event.target.value);
    console.log(numberOfPlayers);
    determineInput();
});


let players = []; // stores global players in an array {id:number name:string}

let addPlayers = () => {
    if (numberOfPlayers !== undefined) {
        for(let i = 0; i<numberOfPlayers; i++) {
        players[i] = { id: i, name: players[i]?.name || "" };
        console.log(players)
        }
    }
}

// helper function to change player name
let changePlayerName = (id, name) => {
    players[id].name = name;
    console.log(`Player ${id + 1} name set to ${name}`)
};

const playerNameDiv = document.getElementById("enter-player-name");

const determineInput = () => {
    console.log(numberOfPlayers)
    //remove existing button
    const buttons = playerNameDiv.querySelectorAll("button");
    buttons.forEach(button => button.remove());
    
    let lengthDif = Math.abs(numberOfPlayers - players.length)
    //playerNameDiv.innerHTML = ""; // reset the input boxes - will have no effect initially

    //conditional to determine how many inputs
    if(numberOfPlayers > 0) {
        
        // if the new number of players is greater than the current length we want to push more players to end!
        if (numberOfPlayers > players.length) {
            createInput(playerNameDiv, lengthDif, numberOfPlayers, changePlayerName);
        }

        // if the new number of players is greater than the current length we want to remove more players from end!
        else if (numberOfPlayers < players.length) {
            removeInput(playerNameDiv, lengthDif, players);
        }

        // catches for the first time where 
        else {
            createInput(playerNameDiv, numberOfPlayers, numberOfPlayers, changePlayerName)
        }
    }
    //creating a button for completion
        createButton(playerNameDiv, "confirm-players");
    addPlayers()
};


