const { ipcRenderer } = require('electron');
const dialog = require("electron").remote.dialog;
const fs = require('fs');
const path = require('path');

const gamesPath = path.join(__dirname, '../../config/games.json');

const form = document.querySelector('form');
const inputName = document.getElementById('name');
const inputDir = document.getElementById('path');

form.addEventListener('submit', submitForm);

var gameKey;

ipcRenderer.on('selected:gameId', function (e, gameId) {
    gameKey = gameId;

    var data = fs.readFileSync(gamesPath);
    var jsonData = JSON.parse(data);

    inputName.value = jsonData[gameKey]['name'];
    inputDir.value = jsonData[gameKey]['path'];
})

const btnGetPath = document.getElementById('getPath');
btnGetPath.addEventListener('click', (e) => {
    var gameDir = dialog.showOpenDialogSync({
        title: 'Select game directory',
        properties: ["openDirectory"]
    })

    if (gameDir !== undefined) {
        inputDir.value = gameDir;
    }
})

const btnCancel = document.getElementById('cancel');
btnCancel.addEventListener('click', (e) => {
    ipcRenderer.send('window:editGame:close');
})

function submitForm(e) {
    e.preventDefault();

    var data = fs.readFileSync(gamesPath);
    var jsonData = JSON.parse(data);

    const gameName = document.querySelector('#name').value;
    const gameDir = document.querySelector('#path').value;

    jsonData[gameKey] = {
        name: gameName,
        path: gameDir
    };

    var data = JSON.stringify(jsonData, null, 4);
    fs.writeFileSync(gamesPath, data);

    ipcRenderer.send('menu:games:update');
    ipcRenderer.send('window:editGame:close');
}