/*---------------------------------Modular functions that can be reused------------------------------------------------*/

// function to create buttons   
const createButton = (parent, buttonName) => {
    let newButton = document.createElement("button");
    newButton.id = buttonName
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

/*-------------Table functions-----*/

const removeInputs = (item, containerId, oneOrAll) => {
    
    const container = document.getElementById(containerId);

    if(oneOrAll.toLowerCase() === "one") {
        const removeItem = container.querySelector(item);
        if(removeItem) {removeItem.remove();}
    }
    else if (oneOrAll.toLowerCase() === "all") {
        const removeItems = container.querySelectorAll(item);
        removeItems.forEach(element => element.remove())
    }
    else {
        throw new Error('you must enter either "single" representing a single removal or "all" to remove all items')
    }
}

let createTableHeader = (labels, referenceTable) => {
    const createRow = document.createElement("tr")
    labels.forEach(headerLabel => {
        const header = document.createElement("th");
        header.textContent = headerLabel;
        createRow.appendChild(header)
    })
    referenceTable.appendChild(createRow);
}

let createTableData = (data, referenceTable) => {
    for (let i = 0; i < data.length; i++) {
        const createRow = document.createElement("tr");
        for (let j = 0; j<Object.keys(data[i]).length-3; j++) {
            const dataReference = document.createElement("td");
            let value = Object.values(data[i])[j];
            dataReference.textContent = value;
            createRow.appendChild(dataReference);   
            }
        referenceTable.appendChild(createRow);
    }
}

/*-------------Matchups-----*/

let addHeader = (matchupNumber, matchupsId) => {
    const createHeader = document.createElement("h2");
    createHeader.textContent = `Matchup ${matchupNumber}`;
    matchupsId.appendChild(createHeader);
};

const pairKey = pair => {
    return pair
    .slice() // create pair copy
    .sort() // sort
    .join("|") // add a separtor for unique string
}

const generateAllPairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  console.log(pairs);
  return pairs;
};

let shuffledArray = (arr) => {

    if (!Array.isArray(arr)) {
        new Error("Expected array but got:", arr);
        return [];
    }

    const arrayShuffled = [...arr]

    for (let i = arrayShuffled.length-1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i+1));
        [arrayShuffled[i], arrayShuffled[j]] = [arrayShuffled[j], arrayShuffled[i]]
    }
    console.log(arrayShuffled)
    return arrayShuffled;
}

export { createButton, createInput, updateArrayLength, removeInputs, createTableHeader, createTableData, addHeader, pairKey, generateAllPairs, shuffledArray };

