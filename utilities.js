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
        nameInput.placeholder = `Player ${i + (numberOfPlayers - len + 1)} Name`;

        //adding an event listener on the basis of text entered
        nameInput.addEventListener("change", (event) => {
        listenerFn(i + (numberOfPlayers - len), event.target.value); // numberOfPlayers - len accounts for dynamic change
        });
        //appending this to the correct part of code
        parent.appendChild(nameInput);
    }
}

//function to remove inputs
let removeInput = (parent, len, array) => {
    const inputRetrieve = parent.querySelectorAll('input'); 
    for(let i = 0; i < len; i++) {
        const index = inputRetrieve.length - 1 - i;
        if (inputRetrieve[index]) {
            inputRetrieve[index].remove();
            array.pop(); // remove last player
        }
    }
}

export { createButton, createInput, removeInput };

