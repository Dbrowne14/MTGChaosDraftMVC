/*-----------------------------------------To do list-----------------------------------------------------*/

/* Stage 1
[x] Get a enterplayername variable, that when you change the state javascript assigns a number
[x] Every time a number is assigned create a list of forms that have option to enter data into
[x] add a utilities functions tab and link / export
[x] Make it so changing the dropdown doesnt clear the UI just adds or subtracts
[x] create a table that assigns players
[x] Shuffle players to generate matchups
[x] Update score and rank on basis of input
[x] Generate multiple matchups - each different 

----Stage 2
[] Add a system in that accounts for odd players / give them a "bye"
[] Build in a function using an Api from mtg that automatically tells you what the chase cards are from random packs. Need to check feasibility.

----Stage 3
[] Rebuild using React 

*/

/*----------------------------------------Enter Player Code--------------------------------------------------------*/


import { createButton, createInput, updateArrayLength, removeInputs, createTableHeader, createTableData, addHeader, findFromNestedObject, calculateScore, scoreTable, calculateRank, calcArray, generateRounds } from './utilities.js';

//grabbing number of players dynamically
let numberOfPlayers = undefined;

// helper function to change players
const changeNumberOfPlayers = input => {
    numberOfPlayers = input;
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
            players[i] = {rank: (i+1), name: players[i]?.name || "", score:{w:0, d:0, l:0}, id:i
            };
        };
    };
};

// helper function to change player name
let changePlayerName = (id, name) => {
    players[id].name = name;
    console.log(`Player ${id + 1} name set to ${name}`);
};

const playerNameDiv = document.getElementById("enter-player-name");
const enterPlayerButtonId = "confirm-players";

const determineInput = () => {
    const buttons = playerNameDiv.querySelectorAll("button");
    buttons.forEach(button => button.remove());   //remove existing button
    
    let lengthDif = Math.abs(numberOfPlayers - players.length);

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
            createInput(playerNameDiv, numberOfPlayers, numberOfPlayers, changePlayerName);
        }
    }
    //creating a button for completion
        createButton(playerNameDiv, enterPlayerButtonId);
        let enterPlayerButton = document.getElementById(enterPlayerButtonId);
        enterPlayerButton.addEventListener("click", () => {
            removeInputs("table", "score-table", "one"); // removes existing table if there is one so players can change how many entrants
            createTable("score-table");
            generateMatchupsButton();
            baseArray = calcArray(players);
        });
    addPlayers()
};



/*----------------------------------------Table Code--------------------------------------------------------*/


const headerLabels = ["Rank", "Name", "Score"] // defines width of table and the headings we want as outputs

const createTable = location => {
    //create table from components
    const table = document.createElement("table");
    table.id = "new-table";
    createTableHeader(headerLabels, table);
    createTableData(players, table);
    document.getElementById(location).appendChild(table);
}

// add button to generate matchups from first round
const generateMatchupsButton = () => { 
    const parentNewTable = document.getElementById("new-table");
    createButton(parentNewTable, "generate-matchups");
    let matchupsButton = document.getElementById("generate-matchups");
    matchupsButton.addEventListener("click", () => {
       cleanUpFirstRd();     
       baseArray = calcArray(players);
       generateRounds(baseArray, matchups, numberOfMatchups);
       find_Create_Allmatchups();
       createMatchup(playerMatchups, matchupsId);
       saveScoresBtn();
    })
}


/*----------------------------------------Matchups--------------------------------------------------------*/

let round = 1; // starts at 1 - counts each round
let matchupsCounter = 0 // counting each matchup
const numberOfMatchups = 3 // mtg standard
const matchupsId = document.getElementById("matchups"); // 

const cleanUpFirstRd = () => {
    numberOfPlayersSelector.disabled = true; // make button unclickable
    removeInputs("button", "new-table", "one");
    removeInputs("button", "enter-player-name", "one");
    removeInputs("input", "enter-player-name", "all");
    addHeader(round, matchupsId);
}

const cleanUpNextRds = () => {
    removeInputs("table", "score-table", "one"); // removes existing table if there is one so players can change how many entrants
    createTable("score-table"); // creates new table with updated rank
    matchupsId.innerHTML = ""; // removes all data from matchups section
    if (round <= numberOfMatchups) {
        addHeader(round, matchupsId);
    }
}

let baseArray = []; //standard array to use
window.baseArray = baseArray;

let matchups = []; // matchups generated purely with id - cannot directy use name - in case there are duplicate names
window.matchups = matchups;

let playerMatchups =[]; // converted array with name and id - [name,id]
window.playerMatchups = playerMatchups;

const find_Create_Allmatchups = () => {
    for(let i =0; i<1; i++) {
        for (let j=0; j<numberOfMatchups;j++) {
            let matchupSet = [];
            for (let k=0; k<(numberOfPlayers/2); k++) {
                let pair = [];
                for(let l=0; l<2; l++) {
                    let idValue = matchups[i][j][k][l];
                    //console.log("Accessing:", i, j, k, l, "Value:", idValue);
                    let nameAndId = findFromNestedObject("id", players, idValue);
                    const { id, name } = nameAndId;
                    pair.push([id, name]);
                }
               matchupSet.push(pair); 
            }
            playerMatchups.push(matchupSet);
        }
    }
}


// function to create matchups. This is quite a lengthy block of code that maybe could be made more modular or refined, but landed on this solution.
const createMatchup = (playerMatchups, location) => {
    const div = document.createElement("div");
    div.className = "pvp";
    location.appendChild(div);

    const matchesPerRound = numberOfPlayers/2
    const dynamicStart =  matchesPerRound *(round-1);
    const dynamicLength =  matchesPerRound *round;

    for (let i = dynamicStart; i < dynamicLength; i++) { // looping through matchups according to which round we are on
        
        const createP = document.createElement("p");
        createP.textContent = `${playerMatchups[round-1][i%2][0][1]} vs ${playerMatchups[round-1][i%2][1][1]}`; // i%2 to give modulo 0 or 1 depending on p1 or p2
        div.appendChild(createP)

        for (let j = 0 ; j< 2; j++) {   
            const [id, name] = playerMatchups[round-1][i%2][j];
            let opponent;
            if (playerMatchups[round-1][i%2][j+1]) {
                opponent = playerMatchups[round-1][i%2][j+1]
            }
            else {
                opponent = playerMatchups[round-1][i%2][j-1]
            }
            const [idO] = opponent; // grab opponent id - I chose to tally scores purely based on wins and draws, calculating losses based on opponents wins


            //inputW - create both win inputs
            const inputW = document.createElement("input");
            inputW.type = "number";
            inputW.min = 0;
            inputW.max = 2;
            inputW.placeholder = "-";
            inputW.name = `matchup-${name}-w`;
            const labelW = document.createElement("label");
            labelW.textContent = `${name} wins: `;
            labelW.appendChild(inputW);
            div.appendChild(labelW);
            inputW.addEventListener("change", () => {
                const player = findFromNestedObject("id", players, id); // listener to tally player wins
                player.score.w += Number(inputW.value);

                const playerO = findFromNestedObject("id", players, idO); // listener to tally opponent losses
                playerO.score.l += Number(inputW.value);
            });
        };
        
        //inputDraw - create draw inputs

        const inputD = document.createElement("input");

        inputD.type = "number";
        inputD.min = 0;
        inputD.max = 3;
        inputD.name = `matchup-${matchupsCounter}-d`;
        const labelD = document.createElement("label");
        labelD.textContent = `draws: `;
        labelD.appendChild(inputD);
        div.appendChild(labelD);
        location.appendChild(div);
        inputD.addEventListener("change", () => {
            const p1 = findFromNestedObject("id", players, playerMatchups[round-1][i%2][0][0]); // listener to tally draws
            p1.score.d += Number(inputD.value);

            const p2 = findFromNestedObject("id", players, playerMatchups[round-1][i%2][1][0]); // listener to tally draws
            p2.score.d += Number(inputD.value);
        })
        matchupsCounter++; //increase matchupsCounter - used mainly for naming draws (so they are unique)
    }
    round++;
    console.log(playerMatchups) //test

}

//button for subsequent rounds past the first
const saveScoresBtn = () => {
    createButton(matchupsId, "save-scores");
    let saveScoresButton = document.getElementById("save-scores");
    saveScoresButton.addEventListener("click", () => {
        calculateRank(scoreTable(players),players);
        cleanUpNextRds(); //remove inputs and table from previous round
        if (round <= numberOfMatchups) { 
            createMatchup(playerMatchups, matchupsId); // create new matchup
            saveScoresBtn(); // recreate button everytime
        }
        else {
        const createHeader = document.createElement("h1");
        createHeader.textContent = `Final Scores are in!`;
        matchupsId.appendChild(createHeader);
        }
    })
}