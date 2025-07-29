//interaction for draft.html

//getting the key interactive pieces
let draftBlock = document.getElementById('draft-block');
let allTables = document.getElementsByClassName('all-tables')
let submit = document.getElementById('submit');

//getting the hidden tables
let ixalanTable = document.getElementById('ixalan-table');
let phyrexianTable = document.getElementById('phyrexian-table');
let innistradTable = document.getElementById('innistrad-table');
let ravnicaTable = document.getElementById('ravnica-table');
let tarkirTable = document.getElementById('tarkir-table');



const draftTable = () => {
    
    for (let i =0; i<allTables.length; i++) {
    allTables[i].style.display = 'none'
    }

    if (draftBlock.value === 'Ixalan Block') {
    ixalanTable.style.display = 'block';
    }

    else if (draftBlock.value === 'Phyrexian Block') {
    phyrexianTable.style.display = 'block';
    }

    else if (draftBlock.value === 'Innistrad Block') {
    innistradTable.style.display = 'block';
    }

    else if (draftBlock.value === 'Ravnica Block') {
    ravnicaTable.style.display = 'block';
    }

    else if (draftBlock.value === 'Tarkir Block') {
    tarkirTable.style.display = 'block';
    }
}

submit.onclick = draftTable;

