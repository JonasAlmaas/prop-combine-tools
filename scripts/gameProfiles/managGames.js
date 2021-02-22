const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const btnAdd = document.getElementById('btn-add');
const btnEdit = document.getElementById('btn-edit');
const btnRemove = document.getElementById('btn-remove');
const btnCancel = document.getElementById('btn-cancel');

const gamesPath = path.join(__dirname, '../../config/games.json');
var activeGame = null;

btnAdd.addEventListener('click', (e) => {
    ipcRenderer.send('window:addGame:create');
})

btnEdit.addEventListener('click', (e) => {
    if (activeGame !== null) {
        ipcRenderer.send('window:editGame:create', activeGame);
    }
})

btnRemove.addEventListener('click', (e) => {
    if (activeGame !== null) {
        var data = fs.readFileSync(gamesPath);
        var jsonData = JSON.parse(data);

        delete jsonData[activeGame];

        var data = JSON.stringify(jsonData, null, 4);
        fs.writeFileSync(gamesPath, data);

        activeGame = null;
    }
})

btnCancel.addEventListener('click', (e) => {
    ipcRenderer.send('window:manageGames:close');
})

const listContainer = document.getElementById('intractable-list-container');

function updateGamesList() {
    listContainer.innerHTML = '';
    if (fs.existsSync(gamesPath)) {
        var data = fs.readFileSync(gamesPath);
        var jsonData = JSON.parse(data);

        for (var key in jsonData) {
            const button = document.createElement('button');
            if (key == activeGame) {
                button.className = 'active-intractable-list-item noselect';
            } else {
                button.className = 'intractable-list-item noselect';
            }
            button.id = key;
            button.onclick = function () {
                activeGame = button.id;
                console.log(activeGame)
            }

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

setInterval(function () {
    updateGamesList();
}, 350)
