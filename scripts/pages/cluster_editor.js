const dialog = require("electron").remote.dialog
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const paths = require('./../scripts/paths.js')
const preview = require('../scripts/preview.js');
const sidebar = require('../scripts/sidebar.js')
sidebar.create('projects')

const btnNewModel = document.getElementById('btn-new');
const btnRemoveModel = document.getElementById('btn-remove');
const btnBrowse = document.getElementById('btn-browse')

const inputName = document.getElementById('input-name');
const inputClstLmt = document.getElementById('input-clst-lmt');
const inputDistLmt = document.getElementById('input-dist-lmt');
const inputMaterialPath = document.getElementById('input-mat-path')
const dropdownSurPropList = document.getElementById('sur-prop-select');
const modelsListWrapper = document.getElementById('models-list-wrapper');
const previewContent = document.getElementById('preview-content');

const activeProject = localStorage.getItem("selectedProject");
const activeCluster = localStorage.getItem("selectedCluster");

var selectedModel = null; 

btnNewModel.addEventListener('click', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    var jsonDataGames = JSON.parse(fs.readFileSync(paths.games));

    var mdlPaths = dialog.showOpenDialogSync({
        title: 'Select model(s)',
        properties: ['openFile', 'multiSelections'],
        filters: [
            { name: 'Models', extensions: ['mdl'] }
        ]
    })

    if (mdlPaths !== undefined) {
        for (var mdlPath in mdlPaths) {
            mdlPath = mdlPaths[mdlPath]
            mdlPath = mdlPath.toString().split(jsonDataGames[jsonData[activeProject]['game']]['path'].toString() + "\\").join("")
    
            var newModel = true;
            for (var peer in jsonData[activeProject]['clusters'][activeCluster]['peers']) {
                if (mdlPath == jsonData[activeProject]['clusters'][activeCluster]['peers'][peer]) {
                    newModel = false;
                    break;
                }
            }

            if (newModel) {
                jsonData[activeProject]['clusters'][activeCluster]['peers'][uuidv4()] = mdlPath
                fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
            }
        }
        updateModelsList()
        updatePreview()
    }
})
btnRemoveModel.addEventListener('click', (e) => {
    if (selectedModel !== null) {
        var jsonData = JSON.parse(fs.readFileSync(paths.projects));
        delete jsonData[activeProject]['clusters'][activeCluster]['peers'][selectedModel];
        fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
        selectedModel = null;
        updateModelsList();
        updatePreview();
    }
})
btnBrowse.addEventListener('click', (e) => {
    var matPath = dialog.showOpenDialogSync({
        title: 'Select material path',
        properties: ["openDirectory"]
    })

    if (matPath !== undefined) {
        var jsonData = JSON.parse(fs.readFileSync(paths.projects));
        var jsonDataGames = JSON.parse(fs.readFileSync(paths.games));
        inputMaterialPath.value = matPath[0].toString().split(jsonDataGames[jsonData[activeProject]['game']]['path'].toString() + "\\materials\\").join("");
        jsonData[activeProject]['clusters'][activeCluster]['materialPath'] = inputMaterialPath.value;
        fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    }
})

inputName.addEventListener('change', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    jsonData[activeProject]['clusters'][activeCluster]['name'] = inputName.value;
    fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    updatePreview();
})
inputClstLmt.addEventListener('change', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    jsonData[activeProject]['clusters'][activeCluster]['clusterLimit'] = inputClstLmt.value;
    fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    updatePreview();
})
inputDistLmt.addEventListener('change', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    jsonData[activeProject]['clusters'][activeCluster]['distanceLimit'] = inputDistLmt.value;
    fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    updatePreview();
})
inputMaterialPath.addEventListener('change', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    jsonData[activeProject]['clusters'][activeCluster]['materialPath'] = inputMaterialPath.value;
    fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
})
dropdownSurPropList.addEventListener('change', (e) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    jsonData[activeProject]['clusters'][activeCluster]['surfaceProp'] = dropdownSurPropList.value;
    fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    updatePreview();
})

function checkForNewCluster() {
    if (fs.existsSync(paths.projects) == false) {
        var jsonData = {};
    } else {
        var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    }
    
    var newCluster = true;
    for (var key in jsonData[activeProject]['clusters']) {
        if (key == activeCluster) {
            newCluster = false;
            break;
        }
    }

    if (newCluster) {
        jsonData[activeProject]['clusters'][activeCluster] = {
            "name": inputName.value,
            "clusterLimit": inputClstLmt.value,
            "distanceLimit": inputDistLmt.value,
            "materialPath": inputMaterialPath.value,
            "surfaceProp": 'default',
            "peers": {
            }
        }
        fs.writeFileSync(paths.projects, JSON.stringify(jsonData, null, 4));
    }
}

function main() {
    checkForNewCluster();
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));
    
    // Create surface prop list
    dropdownSurPropList.innerHTML = '';
    for (var prop in surface_props) {
        const option = document.createElement('option');
        option.value = surface_props[prop];
        option.innerHTML = surface_props[prop];
        dropdownSurPropList.appendChild(option);
    }

    // Set correct values
    inputName.value = jsonData[activeProject]['clusters'][activeCluster]['name'];
    inputClstLmt.value = jsonData[activeProject]['clusters'][activeCluster]['clusterLimit'];
    inputDistLmt.value = jsonData[activeProject]['clusters'][activeCluster]['distanceLimit'];
    inputMaterialPath.value = jsonData[activeProject]['clusters'][activeCluster]['materialPath'];
    dropdownSurPropList.value = jsonData[activeProject]['clusters'][activeCluster]['surfaceProp'];

    updateModelsList();
    updatePreview();
}

function updateModelsList() {
    modelsListWrapper.innerHTML = '';

    var jsonData = JSON.parse(fs.readFileSync(paths.projects));

    for (var key in jsonData[activeProject]['clusters'][activeCluster]['peers']) {
        const button = document.createElement('button');

        if (key == selectedModel) {
            button.className = 'intractable-list-item active-intractable-list-item noselect';
        } else {
            button.className = 'intractable-list-item noselect';
        }
        button.id = key;
        button.onclick = function () {
            selectedModel = button.id;
            updateModelsList();
        }

        var labelName = document.createElement('label');
        labelName.innerHTML  = jsonData[activeProject]['clusters'][activeCluster]['peers'][key];

        button.appendChild(labelName);

        modelsListWrapper.appendChild(button);
    }
}

function updatePreview() {
    previewContent.innerHTML = preview.cluster(activeProject, activeCluster);
}

const surface_props = [
    "default",
    "alienflesh",        
    "antlion",
    "antlionsand",       
    "armorflesh",        
    "bloodyflesh",       
    "brackingrubbertire",
    "brick",
    "canister",
    "cardboard",
    "carpet",
    "ceiling_tile",      
    "chain",
    "chainlink",
    "combine_glass",     
    "combine_metal",     
    "computer",
    "concrete",
    "concrete_block",    
    "crowbar",
    "default_silent",
    "dirt",
    "flesh",
    "floating_metal_barrel",
    "floatingstandable",
    "foliage",
    "glass",
    "glassbottle",
    "grass",
    "gravel",
    "grenade",
    "gunship",
    "ice",
    "item",
    "jeeptire",
    "ladder",
    "metal",
    "metal_barrel",
    "metal_bouncy",
    "metal_box",
    "metal_seafloorcar",
    "metalgrate",
    "metalpanel",
    "metalvehicle",
    "metalvent",
    "mud",
    "no_decal",
    "paintcan",
    "paper",
    "papercup",
    "plaster",
    "plastic",
    "plastic_barrel",
    "plastic_barrel_buoyant",
    "plastic_box",
    "player",
    "player_control_clip",
    "popcan",
    "pottery",
    "quicksand",
    "rock",
    "roller",
    "rubber",
    "rubbertire",
    "sand",
    "slidingrubbertire",
    "slidingrubbertire_front",
    "slidingrubbertire_rear",
    "slime",
    "slipperymetal",
    "slipperyslime",
    "snow",
    "solidmetal",
    "strider",
    "tile",
    "wade",
    "water",
    "watermelon",
    "weapon",
    "wood",
    "wood_box",
    "wood_furniture",
    "wood_panel",
    "wood_plank",
    "wood_solid",
    "zombieflesh",
]

main()
