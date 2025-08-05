/*-----------------------------------------To do list-----------------------------------------------------*/

/*
[x] Get a enterplayername variable, that when you change the state javascript assigns a number
[x] Every time a number is assigned create a list of forms that have option to enter data into
[x] add a utilities functions tab and link / export
[x] Make it so changing the dropdown doesnt clear the UI just adds or subtracts
[] create a table that assigns players
*/


/*----------------------------------------Enter Player Code--------------------------------------------------------*/


import { createButton, createInput, updateArrayLength, removeInputs, createTableHeader, createTableData } from './utilities.js';

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
    determineInput();
});


let players = []; // stores global players in an array {rank:number, name:string, score:{w:,d:,l:}, score() function, id: number}
window.players = players; // enable for debugging


let addPlayers = () => {
    if (numberOfPlayers !== undefined) {
        for(let i = 0; i<numberOfPlayers; i++) {
            players[i] = {rank: (i+1), name: players[i]?.name || "", score:{w:0, d:0, l:0}, scoreTotal () {this.score.w - this.score.l}, id:i
            };
        };
    };
};

// helper function to change player name
let changePlayerName = (id, name) => {
    players[id].name = name;
    console.log(`Player ${id + 1} name set to ${name}`)
};

const playerNameDiv = document.getElementById("enter-player-name");
const enterPlayerButtonId = "confirm-players";

const determineInput = () => {
    const buttons = playerNameDiv.querySelectorAll("button");
    buttons.forEach(button => button.remove());   //remove existing button
    
    let lengthDif = Math.abs(numberOfPlayers - players.length)

    //conditional to determine how many inputs
    if(numberOfPlayers > 0) {
        
        // if the new number of players is greater than the current length we want to push more players to end!
        if (numberOfPlayers > players.length) {
            createInput(playerNameDiv, lengthDif, numberOfPlayers, changePlayerName);
        }

        // if the new number of players is greater than the current length we want to remove more players from end!
        else if (numberOfPlayers < players.length) {
            updateArrayLength(playerNameDiv, lengthDif, players);
        }

        // conditional for the first input
        else {
            createInput(playerNameDiv, numberOfPlayers, numberOfPlayers, changePlayerName)
        }
    }
    //creating a button for completion
        createButton(playerNameDiv, enterPlayerButtonId);
        let enterPlayerButton = document.getElementById(enterPlayerButtonId);
        enterPlayerButton.addEventListener("click", () => {
            removeInputs("table", "score-table");
            createTable("score-table");
        });
    addPlayers()
};



/*----------------------------------------Table Code--------------------------------------------------------*/

//Create a table from button click 

//loop for creating table rows

//location to place table
const headerLabels = ["Rank", "Name", "Score"] // defines width of table and the headings we want as outputs

const createTable = location => {

    //create table from components
    const table = document.createElement("table")
    table.id = "new-table"
    createTableHeader(headerLabels, table);
    createTableData(players, table);
    document.getElementById(location).appendChild(table)

    // add button
    const parentNewTable = document.getElementById("new-table")
    createButton(parentNewTable, "generate-matchups")
    let matchupsButton = document.getElementById("generate-matchups");
    matchupsButton.addEventListener("click", () => {
       removeInputs("button", "new-table") 
    })
}






/*let tableOutput = []; // stores table Output that we want to show in table
window.tableOutput = tableOutput; // enable for debugging

let tableDataFromPlayers = () => {
    if(!players) return;

    return players.map(player => {
    const {rank, name, score} = player;
    return {rank, name, score};
    });
};*/




