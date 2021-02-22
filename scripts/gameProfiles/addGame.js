const { ipcRenderer } = require('electron');
const dialog = require("electron").remote.dialog;
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const configFolderPath = path.join(__dirname, '../../config');
const gamesPath = path.join(configFolderPath, 'games.json');

const form = document.querySelector('form');
const inputDir = document.getElementById('path');

form.addEventListener('submit', submitForm);

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
    ipcRenderer.send('window:addGame:close');
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
    const gameDir = document.querySelector('#path').value;

    jsonData[uuidv4()] = {
        name: gameName,
        path: gameDir
    };

    var data = JSON.stringify(jsonData, null, 4);
    fs.writeFileSync(gamesPath, data);

    ipcRenderer.send('menu:games:update');
    ipcRenderer.send('window:addGame:close');
}