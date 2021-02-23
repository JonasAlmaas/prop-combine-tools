const dialog = require("electron").remote.dialog;
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataFolderPath = path.resolve(__dirname, '../data');
const gamesPath = path.resolve(dataFolderPath, 'games.json');

const btnEdit = document.getElementById('btn-edit');
const btnRemove = document.getElementById('btn-remove');
const btnBrowse = document.getElementById('btn-browse');
const btnCancel = document.getElementById('btn-cancel');
const btnSubmit = document.getElementById('btn-submit');
const form = document.querySelector('form');

const listContainer = document.getElementById('intractable-list-container');
const inputName = document.getElementById('name');
const inputDir = document.getElementById('path');

var activeGame = null;
var isEditing = false;

btnEdit.addEventListener('click', (e) => {
    edit();
})
btnRemove.addEventListener('click', (e) => {
    if (activeGame !== null) {
        var data = fs.readFileSync(gamesPath);
        var jsonData = JSON.parse(data);

        delete jsonData[activeGame];

        var data = JSON.stringify(jsonData, null, 4);
        fs.writeFileSync(gamesPath, data);

        activeGame = null;
        updateGamesList();
    }
})
btnBrowse.addEventListener('click', (e) => {
    var gameDir = dialog.showOpenDialogSync({
        title: 'Select game directory',
        properties: ["openDirectory"]
    })

    if (gameDir !== undefined) {
        inputDir.value = gameDir;
    }
})
btnCancel.addEventListener('click', (e) => {
    activeGame = null;
    disableEditing();
    clearInputs();
})
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (fs.existsSync(dataFolderPath) == false) {
        fs.mkdirSync(dataFolderPath);
    }

    if (fs.existsSync(gamesPath)) {
        var data = fs.readFileSync(gamesPath);
        var jsonData = JSON.parse(data);
    } else {
        jsonData = {}
    }

    const gameName = document.querySelector('#name').value;
    const gameDir = document.querySelector('#path').value;

    if (isEditing) {
        gameKey = activeGame;
    } else {
        gameKey = uuidv4();
    }

    jsonData[gameKey] = {
        name: gameName,
        path: gameDir
    };

    var data = JSON.stringify(jsonData, null, 4);
    fs.writeFileSync(gamesPath, data);

    disableEditing();
    clearInputs();
})

function edit() {
    if (activeGame !== null) {
        var data = fs.readFileSync(gamesPath);
        var jsonData = JSON.parse(data);

        inputName.value = jsonData[activeGame]['name'];
        inputDir.value = jsonData[activeGame]['path'];

        enableEditing();
    }
}

function enableEditing() {
    btnSubmit.innerHTML = 'Save Changes';
    isEditing = true;
}

function disableEditing() {
    btnSubmit.innerHTML = 'Create New';
    isEditing = false;
}

function clearInputs() {
    inputName.value = '';
    inputDir.value = '';
    updateGamesList();
}

function updateGamesList() {
    listContainer.innerHTML = '';
    if (fs.existsSync(gamesPath)) {
        var data = fs.readFileSync(gamesPath);
        var jsonData = JSON.parse(data);

        for (i=0; i<20; i++) {
            for (var key in jsonData) {
                const button = document.createElement('button');
                if (key == activeGame) {
                    button.className = 'intractable-list-item active-intractable-list-item noselect';
                } else {
                    button.className = 'intractable-list-item noselect';
                }
                button.id = key;
                button.onclick = function () {
                    activeGame = button.id;
                    updateGamesList();
                }
                button.addEventListener('dblclick', (e) => {
                    edit();
                })
    
                var labelName = document.createElement('label');
                labelName.innerHTML  = jsonData[key]['name'];
    
                var labelPath = document.createElement('label');
                labelPath.innerHTML  = jsonData[key]['path'];
    
                button.appendChild(labelName);
                button.appendChild(labelPath);
    
                listContainer.appendChild(button);
            }
        }
    }
}

updateGamesList();