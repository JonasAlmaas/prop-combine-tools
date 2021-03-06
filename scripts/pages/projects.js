const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const paths = require('./../scripts/paths.js')
const fileWriter = require('./../scripts/fileWriter.js')
const alerts = require('./../scripts/alerts.js')
const preview = require('../scripts/preview.js');
const sidebar = require('../scripts/sidebar.js')
sidebar.create('projects')

const profilesListContainter = document.getElementById('profiles-list-containter');
const previewContent = document.getElementById('preview-content');

const btnNewProject = document.getElementById('btn-new');
const btnEdit = document.getElementById('btn-edit');
const btnRemove = document.getElementById('btn-remove');
const btGenFiles = document.getElementById('btn-gen-files');

var selectedProject = null;

btGenFiles.addEventListener('click', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));

    if (selectedProject == null) {
        alerts.error("Please select a project")
    }
    else if (jsonData[selectedProject]['game'] == "none") {
        alerts.error("Make sure you have a game selected")
    }
    else if (Object.keys(jsonData[selectedProject]['clusters']).length === 0) {
        alerts.error("You don't have any clusters")
    } else if (hasEmptyClusters(selectedProject)) {
        alerts.error("You have an incomplete cluster")
    } else {
        fileWriter.generateFiles(selectedProject)
        alerts.success("All files have been generated!")
    }
})

function hasEmptyClusters(selectedProject) {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));

    for (var cluster in jsonData[selectedProject]['clusters']) {
        if (Object.keys(jsonData[selectedProject]['clusters'][cluster]['peers']).length === 0) {
            return true
        }
    }

    return false
}

btnNewProject.addEventListener('click', (e) => {
    localStorage.setItem("selectedProject", uuidv4());
    window.location.href = './project_editor.html';
})
btnEdit.addEventListener('click', (e) => {
    edit();
})
btnRemove.addEventListener('click', (e) => {
    if (selectedProject !== null) {
        var jsonData = JSON.parse(fs.readFileSync(paths.projects));
        delete jsonData[selectedProject];
        fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
        selectedProject = null;
        updateProjectsList();
        updatePreview();
    }
})

function edit() {
    if (selectedProject !== null) {
        localStorage.setItem("selectedProject", selectedProject);
        window.location.href = './project_editor.html'
    }
}

function updateProjectsList() {
    profilesListContainter.innerHTML = '';
    if (fs.existsSync(paths.projects)) {
        var jsonData = JSON.parse(fs.readFileSync(paths.projects));

        for (var key in jsonData) {
            const button = document.createElement('button');
            if (key == selectedProject) {
                button.className = 'intractable-list-item active-intractable-list-item noselect';
            } else {
                button.className = 'intractable-list-item noselect';
            }
            button.id = key;
            button.onclick = function () {
                selectedProject = button.id;
                updateProjectsList();
                updatePreview();
            }
            button.addEventListener('dblclick', (e) => {
                edit();
            })

            var labelName = document.createElement('label');
            labelName.innerHTML  = jsonData[key]['name'];
    
            var labelPath = document.createElement('label');

            if (fs.existsSync(paths.projects)) {
                var jsonDataGames = JSON.parse(fs.readFileSync(paths.games));

                try {
                    labelPath.innerHTML  = jsonDataGames[jsonData[key]['game']]['path'];
                } catch {
                    labelPath.innerHTML  = 'No game selected'; 
                }
            }

            button.appendChild(labelName);
            button.appendChild(labelPath);
    
            profilesListContainter.appendChild(button);
        }
    }
}

function updatePreview() {
    if (selectedProject == null) {
        previewContent.innerHTML = ''
    } else {
        previewContent.innerHTML = preview.project(selectedProject);
    }
}

updateProjectsList();
