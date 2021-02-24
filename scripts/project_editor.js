const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataFolderPath = path.resolve(__dirname, '../data');
const projectDataPath = path.resolve(dataFolderPath, 'projectData.json');

const clustersListWrapper = document.getElementById('clusters-list-wrapper');
const previewWrapper = document.getElementById('preview-wrapper');

const btnNewCluster = document.getElementById('btn-new');
const btnEditCluster = document.getElementById('btn-edit');
const btnRemoveCluster = document.getElementById('btn-remove');

var selectedCluster = null;
const activeProject = localStorage.getItem("selectedProject");

btnNewCluster.addEventListener('click', (e) => {

})
btnEditCluster.addEventListener('click', (e) => {
    
})
btnRemoveCluster.addEventListener('click', (e) => {
    clustersListWrapper.innerHTML = '';
    previewWrapper.innerHTML = '';
})

function edit() {

}

function updateClusterList() {
    if (activeProject !== null) {
        clustersListWrapper.innerHTML = '';
        if (fs.existsSync(projectDataPath)) {
            var jsonData = JSON.parse(fs.readFileSync(projectDataPath));
    
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
                    updatePreview();
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
}

function updatePreview() {
    if (selectedCluster !== null) {
        previewWrapper.innerHTML = '';

        if (fs.existsSync(projectDataPath)) {
            var jsonData = JSON.parse(fs.readFileSync(projectDataPath));

            for (i=0; i<20; i++) {
                for (var peer in jsonData[activeProject]['clusters'][selectedCluster]['peers']) {
                    const labelName = document.createElement('div');
                    labelName.innerHTML = jsonData[activeProject]['clusters'][selectedCluster]['peers'][peer];
                    labelName.className = "peer";
                    previewWrapper.appendChild(labelName);
                }
            }
        }
    }
}

updateClusterList();
updatePreview();
