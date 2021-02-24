const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataFolderPath = path.resolve(__dirname, '../data');
const projectDataPath = path.resolve(dataFolderPath, 'projectData.json');

const profilesListContainter = document.getElementById('profiles-list-containter');

const btnNewProject = document.getElementById('btn-new');
const btnEdit = document.getElementById('btn-edit');
const btnRemove = document.getElementById('btn-remove');

var selectedProject = null;

btnNewProject.addEventListener('click', (e) => {
    localStorage.setItem("selectedProject", null)
    window.location.href = './project_editor.html'
})
btnEdit.addEventListener('click', (e) => {
    edit();
})
btnRemove.addEventListener('click', (e) => {
    if (selectedProject !== null) {
        var data = fs.readFileSync(projectDataPath);
        var jsonData = JSON.parse(data);

        delete jsonData[selectedProject];

        var data = JSON.stringify(jsonData, null, 4);
        fs.writeFileSync(projectDataPath, data);

        selectedProject = null;
        updateProjectsList();
    }
})

function edit() {
    if (selectedProject !== null) {
        localStorage.setItem("selectedProject", selectedProject)

        window.location.href = './project_editor.html'
    }
}

function updateProjectsList() {
    profilesListContainter.innerHTML = '';
    if (fs.existsSync(projectDataPath)) {
        var jsonData = JSON.parse(fs.readFileSync(projectDataPath));

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
            }
            button.addEventListener('dblclick', (e) => {
                edit();
            })

            var labelName = document.createElement('label');
            labelName.innerHTML  = jsonData[key]['name'];
    
            var labelPath = document.createElement('label');
            labelPath.innerHTML  = jsonData[key]['game'];
    
            button.appendChild(labelName);
            button.appendChild(labelPath);
    
            profilesListContainter.appendChild(button);
        }
    }
}

updateProjectsList();