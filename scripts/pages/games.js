const paths = require('./../scripts/paths.js')
const sidebar = require('../scripts/sidebar.js')
sidebar.create('games')

const dialog = require("electron").remote.dialog
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const btnEdit = document.getElementById('btn-edit')
const btnRemove = document.getElementById('btn-remove')
const btnBrowse = document.getElementById('btn-browse')
const btnCancel = document.getElementById('btn-cancel')
const btnSubmit = document.getElementById('btn-submit')
const form = document.querySelector('form')

const gamesListContainter = document.getElementById('games-list-containter')
const inputName = document.getElementById('name')
const inputDir = document.getElementById('path')

var selectedGame = null;
var isEditing = false;

btnEdit.addEventListener('click', (e) => {
    edit();
})
btnRemove.addEventListener('click', (e) => {
    if (selectedGame !== null) {
        var data = fs.readFileSync(paths.games);
        var jsonData = JSON.parse(data);

        delete jsonData[selectedGame];

        var data = JSON.stringify(jsonData, null, 4);
        fs.writeFileSync(paths.games, data);

        selectedGame = null;
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
    selectedGame = null;
    disableEditing();
    clearInputs();
})
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (fs.existsSync(paths.appdata) == false) {
        fs.mkdirSync(paths.appdata);
    }

    if (fs.existsSync(paths.games)) {
        var data = fs.readFileSync(paths.games);
        var jsonData = JSON.parse(data);
    } else {
        jsonData = {}
    }

    const gameName = document.querySelector('#name').value;
    const gameDir = document.querySelector('#path').value;

    if (isEditing) {
        gameKey = selectedGame;
    } else {
        gameKey = uuidv4();
    }

    jsonData[gameKey] = {
        name: gameName,
        path: gameDir
    };

    var data = JSON.stringify(jsonData, null, 4);
    fs.writeFileSync(paths.games, data);

    disableEditing();
    clearInputs();
})

function edit() {
    if (selectedGame !== null) {
        var data = fs.readFileSync(paths.games);
        var jsonData = JSON.parse(data);

        inputName.value = jsonData[selectedGame]['name'];
        inputDir.value = jsonData[selectedGame]['path'];

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
    gamesListContainter.innerHTML = '';
    if (fs.existsSync(paths.games)) {
        var data = fs.readFileSync(paths.games);
        var jsonData = JSON.parse(data);

        for (var key in jsonData) {
            const button = document.createElement('button');
            if (key == selectedGame) {
                button.className = 'intractable-list-item active-intractable-list-item noselect';
            } else {
                button.className = 'intractable-list-item noselect';
            }
            button.id = key;
            button.onclick = function () {
                selectedGame = button.id;
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

            gamesListContainter.appendChild(button);
        }
    }
}

updateGamesList();