const { ipcRenderer } = require('electron');
const remote = require("electron").remote;
const dialog = remote.dialog;
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const configFolderPath = path.join(__dirname, '../config');
const gamesPath = path.join(configFolderPath, 'games.json');

const form = document.querySelector('form');
const inputDir = document.getElementById('dir');
const btnGetPath = document.getElementById('getPath');
const btnCancel = document.getElementById('cancel');

form.addEventListener('submit', submitForm);

btnGetPath.addEventListener('click', (e) => {
    var gameDir = dialog.showOpenDialogSync({
        title: 'Select game directory',
        properties: ["openDirectory"]
    })

    if (gameDir !== undefined) {
        inputDir.value = gameDir;
    }
})

btnCancel.addEventListener('click', (e) => {
    ipcRenderer.send('addGame:close');
})

function submitForm(e) {
    e.preventDefault();

    if (fs.existsSync(configFolderPath) == false) {
        fs.mkdirSync(configFolderPath);
    }

    if (fs.existsSync(gamesPath)) {
        var data = fs.readFileSync(gamesPath);
        var jsonData = JSON.parse(data);
    } else {
        jsonData = {};
    }

    const gameName = document.querySelector('#name').value;
    const gameDir = document.querySelector('#dir').value;

    jsonData[uuidv4()] = {
        name: gameName,
        dir: gameDir
    };

    var data = JSON.stringify(jsonData, null, 4);
    fs.writeFileSync(gamesPath, data);

    ipcRenderer.send('addGame:close');
}