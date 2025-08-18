//Modular functions that can be reused

/*---------------------------------EnterPlayer and general functions------------------------------------------------*/

// function to create buttons   
const createButton = (parent, buttonName) => {
    let newButton = document.createElement("button");
    newButton.id = buttonName;
    parent.appendChild(newButton);
};

//function to create inputs
let createInput = (parent, len, numberOfPlayers, listenerFn) => {
    for(let i = 0; i < len; i++) {
        //creating inputs for text for each player
        let nameInput = document.createElement("input"); 
        nameInput.type = "text";
        nameInput.placeholder = `Player ${i + (numberOfPlayers - len + 1)} Name`; // we use a dynamic length in case inputs are added on top of original selection

        nameInput.addEventListener("change", (event) => {
        listenerFn(i + (numberOfPlayers - len), event.target.value); // numberOfPlayers - len accounts for dynamic change
        });
        parent.appendChild(nameInput);//appending this to the correct part of code
    }
}

//function to remove inputs if user decides to change selection
let updateArrayLength = (parent, len, array) => {
    const inputRetrieve = parent.querySelectorAll('input'); 
    for(let i = 0; i < len; i++) {
        const index = inputRetrieve.length - 1 - i;
        if (inputRetrieve[index]) {
            inputRetrieve[index].remove();
            array.pop(); // remove last player
        }
    }
}

/*----------------------------------------Table Fucntions--------------------------------------------------------*/

const removeInputs = (item, containerId, oneOrAll) => {
    
    const container = document.getElementById(containerId);

    if(oneOrAll.toLowerCase() === "one") {
        const removeItem = container.querySelector(item);
        if(removeItem) {removeItem.remove();}
    }
    else if (oneOrAll.toLowerCase() === "all") {
        const removeItems = container.querySelectorAll(item);
        removeItems.forEach(element => element.remove());
    }
    else {
        throw new Error('you must enter either "one" representing one removal or "all" to remove all items')
    }
}

let createTableHeader = (labels, referenceTable) => {
    const createRow = document.createElement("tr")
    labels.forEach(headerLabel => {
        const header = document.createElement("th");
        header.textContent = headerLabel;
        createRow.appendChild(header);
    })
    referenceTable.appendChild(createRow);
}

let createTableData = (data, referenceTable) => {
    for (let i = 0; i < data.length; i++) {
        const createRow = document.createElement("tr");
        for (let j = 0; j<Object.keys(data[i]).length-1; j++) { // this is a bit hackey (using -2) - I don't really know how else to solve it though
            console.log("Printing id", data[i].id);
            if (j !== 2) {
                const dataReference = document.createElement("td");
                let value = Object.values(data[i])[j];
                dataReference.textContent = value;
                createRow.appendChild(dataReference);
                }
            else { // print the specific scores
                const dataReference = document.createElement("td")
                console.log(data[i].id)
                let value = printScore(data, data[i].id)
                dataReference.textContent = value;
                createRow.appendChild(dataReference);
            }   
        }
        referenceTable.appendChild(createRow);
    }
}

const printScore = (arr, id) => {
    console.log("array:", arr, "id:", id)
    const extract = findFromNestedObject("id", arr, id);
    if (!extract) return "0 - 0 - 0"; // fallback if player not found
    const { w, l, d } = extract.score;
    return `${w} - ${l} - ${d}`;
}

/*----------------------------------------Matchups Functions-----------------------------------------------------*/

let addHeader = (matchupNumber, matchupsId) => {
    const createHeader = document.createElement("h2");
    createHeader.textContent = `Matchup ${matchupNumber}`;
    matchupsId.appendChild(createHeader);
};

let shuffledArray = (arr) => {

    if (!Array.isArray(arr)) {
        new Error("Expected array but got:", arr);
        return [];
    }

    const arrayShuffled = [...arr]

    for (let i = arrayShuffled.length-1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [arrayShuffled[i], arrayShuffled[j]] = [arrayShuffled[j], arrayShuffled[i]]; // this is the most efficient way to shuffle an array.
    }
    return arrayShuffled;
}



// function to generate rounds - uses pre-shuffledArray and creates a full set of matchups    
const generateRounds = (arr, outputArr, numberOfMatchups) => {

    if (arr.length % 2 !== 0) {
        arr = [...arr, "Bye"];
    }

    const newArray = shuffledArray(arr);

    const rounds = [];
    const numPlayers = newArray.length;

    for (let round = 0; round < numberOfMatchups; round++) {
        const pairs = [];

        for (let i = 0; i < numPlayers / 2; i++) {
        const p1 = newArray[i];
        const p2 = newArray[numPlayers - 1 - i];
        pairs.push([p1, p2]);
        }

        rounds.push(pairs);

        // Rotate all except first element
        newArray.splice(1, 0, newArray.pop());
    }
    outputArr.push(rounds);
}


//helper to find a player in players object using another key-pair
const findFromNestedObject = (identifier, location, subLocation) => 
        location.find(element => element[identifier] === subLocation);

// function to calculate score using w,d,l
const calculateScore = (wins, losses, draws) => {
    return wins - losses + (draws* 0.01); //using 0.01 as a delimiter in cases of ties
}

// scoretable = [{id: ,calculateScore: , rank:}]
const scoreTable = (arr) => {
    console.log("scoreTable called, arr length:", arr.length);
    let newTable = arr.map(({ id, rank, score }) => ({ id, rank, score }));
    for (let i=0; i<newTable.length; i++) {
        const { score: { w,l, d } } = newTable[i];
        let addCalcSc = calculateScore(w, l, d);
        newTable[i].calculateScore = addCalcSc;
    }
    return newTable;
}

// calcilating rank using modifiedarray and original players array as output
const calculateRank = (array, players) => {
    array.sort((a,b) => b.calculateScore - a.calculateScore);
    console.log(array);
        for (let i = 0; i<array.length; i++) {
            const {id} = array[i];
            array[i].rank = i + 1;
            const updateScore = findFromNestedObject("id", players, id);
            updateScore.rank = array[i].rank;
        }
    players.sort((a,b) => a.rank - b.rank);
    console.log()
}

// simple function to return a mapped array on the basis of id
let calcArray = array => array
    .map((element) => {
        const {id} = element;
        return id;
    });

export { createButton, createInput, updateArrayLength, removeInputs, createTableHeader, createTableData, addHeader, findFromNestedObject, calculateScore, scoreTable, calculateRank, calcArray, generateRounds };

