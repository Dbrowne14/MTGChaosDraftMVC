/*-----------------------------------------To do list-----------------------------------------------------*/

/*
[x] Get a enterplayername variable, that when you change the state javascript assigns a number
[x] Every time a number is assigned create a list of forms that have option to enter data into
[x] add a utilities functions tab and link / export
[x] Make it so changing the dropdown doesnt clear the UI just adds or subtracts
[x] create a table that assigns players
[] Shuffle players to generate matchups
*/


/*----------------------------------------Enter Player Code--------------------------------------------------------*/


import { createButton, createInput, updateArrayLength, removeInputs, createTableHeader, createTableData, addHeader, pairKey, generateAllPairs, shuffledArray } from './utilities.js';

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
            players[i] = {rank: (i+1), name: players[i]?.name || "", score:{w:0, d:0, l:0}, scoreTotal () {this.score.w - this.score.l}, id:i
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
            createInput(playerNameDiv, numberOfPlayers, numberOfPlayers, changePlayerName)
        }
    }
    //creating a button for completion
        createButton(playerNameDiv, enterPlayerButtonId);
        let enterPlayerButton = document.getElementById(enterPlayerButtonId);
        enterPlayerButton.addEventListener("click", () => {
            removeInputs("table", "score-table", "one"); // removes existing table if there is one so players can change how many entrants
            createTable("score-table");
            baseArray = calcArray(players);
        });
    addPlayers()
};



/*----------------------------------------Table Code--------------------------------------------------------*/

//location to place table
const headerLabels = ["Rank", "Name", "Score"] // defines width of table and the headings we want as outputs

const createTable = location => {

    //create table from components
    const table = document.createElement("table");
    table.id = "new-table";
    createTableHeader(headerLabels, table);
    createTableData(players, table);
    document.getElementById(location).appendChild(table);

    // add button
    const parentNewTable = document.getElementById("new-table")
    createButton(parentNewTable, "generate-matchups")
    let matchupsButton = document.getElementById("generate-matchups");
    matchupsButton.addEventListener("click", () => {
       cleanUpFirstRd()     
       generateRounds(baseArray, matchups, numberOfMatchups);
        console.log(matchups);// test
       find_Create_Matchups()
    })
}


/*----------------------------------------Matchups--------------------------------------------------------*/

let matchupsCounter = 1; // starts at 1
const numberOfMatchups = 3 // mtg standard
const matchupsId = document.getElementById("matchups");

const cleanUpFirstRd = () => {
    removeInputs("button", "new-table", "one");
    removeInputs("button", "enter-player-name", "one");
    removeInputs("input", "enter-player-name", "all");
    addHeader(matchupsCounter, matchupsId);
}

let matchups = []; // using this to test for fresh matchups each round
window.matchups = matchups;

let baseArray = [11,23,34,5];
window.baseArray = baseArray;

let calcArray = array => array
    .map((element) => {
        const {id} = element;
        return id;
    });

window.shuffledArray = shuffledArray;

const generateRounds = (arr, outputArr, roundsCount) => {

if (arr.length % 2 !== 0) {
    arr = [...arr, "Bye"];
  }

const allPairs = generateAllPairs(arr);
  const usedPairKeys = [];

  for (let round = 0; round < roundsCount; round++) {
    const roundPairs = [];
    const playersUsedThisRound = [];

    const shuffledPairs = shuffledArray(allPairs);

    for (const pair of shuffledPairs) {
      const [p1, p2] = pair;
      const key = pairKey(pair);

      if (
        !playersUsedThisRound.includes(p1) &&
        !playersUsedThisRound.includes(p2) &&
        !usedPairKeys.includes(key)
      ) {
        roundPairs.push(pair);
        playersUsedThisRound.push(p1, p2);
        usedPairKeys.push(key);
      }

      if (playersUsedThisRound.length === players.length) break;
    }

    outputArr.push(roundPairs);
  }
}

let matchupCounter = 1

const createMatchup = (playerMatchups, location) => {
    const div = document.createElement("div");
    div.className = "pvp" 

    const createP = document.createElement("p");
    createP.textContent = `${playerMatchups[0][1]} vs ${playerMatchups[1][1]}`;
    div.appendChild(createP)


    playerMatchups.forEach(pair => {
    const [id, name] = pair;

        //inputW
        const inputW = document.createElement("input");
        inputW.type = "number";
        inputW.min = 0;
        inputW.max = 2;
        inputW.placeholder = "-";
        inputW.name = `matchup-${name}-w`
        const labelW = document.createElement("label");
        labelW.textContent = `${name} wins: `;
        labelW.appendChild(inputW);
        div.appendChild(labelW);
        console.log(id)
        /*inputW.addEventListener("change", () => {
            for(let i =0; i<players.length; i++) {
                findFromNestedObject(id, players, matchups[i][j][k])?.score.w
            }
        }); work on this */
        })

    //inputDraw
        const inputD = document.createElement("input");
        inputD.type = "number";
        inputD.min = 0;
        inputD.max = 3;
        inputD.name = `matchup-${matchupCounter}-d`
        const labelD = document.createElement("label");
        labelD.textContent = `draws: `;
        labelD.appendChild(inputD);
        div.appendChild(labelD);

        location.appendChild(div);
        matchupCounter ++;
}

const find_Create_Matchups = () => {
    for (let i=0; i<matchupsCounter;i++) {
        for (let j=0; j<numberOfMatchups; j++) {
            let playerMatchups =[];
            for(let k=0; k<2; k++) {
                let pname;
                let nameAndId = findFromNestedObject("id", players, matchups[i][j][k]);
                console.log(nameAndId);
                const {id, name} = nameAndId;
                pname = [id, name];
                playerMatchups[k] = pname; 
            }
            createMatchup(playerMatchups, matchupsId);
        }
    }
    createButton(matchupsId, "save-scores")
    //let saveScoresButton = "save-scores"
    /*saveScoresButton.addEventListener("click", () => {

    } )*/
}



const findFromNestedObject = (identifier, location, subLocation) => 
        location.find(element => element[identifier] === subLocation);



// shuffle array ideas - get random number 



/*let tableOutput = []; // stores table Output that we want to show in table
window.tableOutput = tableOutput; // enable for debugging

let tableDataFromPlayers = () => {
    if(!players) return;

    return players.map(player => {
    const {rank, name, score} = player;
    return {rank, name, score};
    });
};*/




