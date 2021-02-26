const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const paths = require('./../scripts/paths.js')
const preview = require('../scripts/preview.js');
const sidebar = require('../scripts/sidebar.js')
sidebar.create('projects')

const btnNewCluster = document.getElementById('btn-new');
const btnEditCluster = document.getElementById('btn-edit');
const btnRemoveCluster = document.getElementById('btn-remove');

const inputName = document.getElementById('input-name');
const dropdownGamesList = document.getElementById('game-select');
const clustersListWrapper = document.getElementById('clusters-list-wrapper');
const previewContent = document.getElementById('preview-content');

const activeProject = localStorage.getItem("selectedProject");
var selectedCluster = null;

btnNewCluster.addEventListener('click', (e) => {
    localStorage.setItem("selectedCluster", uuidv4());
    window.location.href = './cluster_editor.html';
})
btnEditCluster.addEventListener('click', (e) => {
    edit();
})
btnRemoveCluster.addEventListener('click', (e) => {
    if (selectedCluster !== null) {
        var jsonData = JSON.parse(fs.readFileSync(paths.projects));
        delete jsonData[activeProject]['clusters'][selectedCluster];
        fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
        selectedCluster = null;
        updateClusterList();
        updatePreview();
    }
})

dropdownGamesList.addEventListener('change', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    jsonData[activeProject]['game'] = dropdownGamesList.value;
    fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    updatePreview();
})

inputName.addEventListener('change', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    jsonData[activeProject]['name'] = inputName.value;
    fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
})

function edit() {
    if (selectedCluster !== null) {
        localStorage.setItem("selectedCluster", selectedCluster);
        window.location.href = './cluster_editor.html';
    }
}

function checkForNewProfile() {
    if (fs.existsSync(paths.projects) == false) {
        var jsonData = {};
    } else {
        var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    }
    
    var newProject = true;
    for (var key in jsonData) {
        if (key == activeProject) {
            newProject = false;
            break;
        }
    }

    if (newProject) {
        jsonData[activeProject] = {
            "name": inputName.value,
            "game": 'none',
            "clusters": {
            }
        }
        fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    }
}

function main() {
    checkForNewProfile();
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    
    // Update games list
    dropdownGamesList.innerHTML = '';

    if (fs.existsSync(paths.games)) {
        var jsonDataGames = JSON.parse(fs.readFileSync(paths.games));

        const option = document.createElement('option');
        option.value = 'none';
        option.innerHTML = 'Select a game';
        dropdownGamesList.appendChild(option);

        for (var key in jsonDataGames) {
            const option = document.createElement('option');
            option.value = key;
            option.innerHTML = jsonDataGames[key]['name'];
            dropdownGamesList.appendChild(option);
        }
    } else {
        const option = document.createElement('option');
        option.value = 'none';
        option.innerHTML = 'No Games Found';
        dropdownGamesList.appendChild(option)
    }

    // Update text
    inputName.value = jsonData[activeProject]['name'];

    var isValidGame = false;
    for (var key in jsonDataGames) {
        if (jsonData[activeProject]['game'] == key) {
            isValidGame = true;
            break;
        }
    }
    if (!isValidGame) {
        jsonData[activeProject]['game'] = 'none';
        fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    }

    dropdownGamesList.value = jsonData[activeProject]['game'];

    updateClusterList();
    updatePreview();
}

function updateClusterList() {
    clustersListWrapper.innerHTML = '';

    if (fs.existsSync(paths.projects)) {
        var jsonData = JSON.parse(fs.readFileSync(paths.projects));

        for (var key in jsonData[activeProject]['clusters']) {
            const button = document.createElement('button');
            if (key == selectedCluster) {
                button.className = 'intractable-list-item active-intractable-list-item noselect';
            } else {
                button.className = 'intractable-list-item noselect';
            }
            button.id = key;
            button.onclick = function () {
                selectedCluster = button.id;
                updateClusterList();
            }
            button.addEventListener('dblclick', (e) => {
                edit();
            })

            var labelName = document.createElement('label');
            labelName.innerHTML  = jsonData[activeProject]['clusters'][key]['name'];

            button.appendChild(labelName);

            clustersListWrapper.appendChild(button);
        }
    }
}

function updatePreview() {
    previewContent.innerHTML = preview.project(activeProject);
}

main()
