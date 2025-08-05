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

const removeInputs = (item, containerId) => {
    const container = document.getElementById(containerId)
    const removeItem = container.querySelector(item);
    if(removeItem) {
        removeItem.remove();
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

export { createButton, createInput, updateArrayLength, removeInputs, createTableHeader, createTableData };

