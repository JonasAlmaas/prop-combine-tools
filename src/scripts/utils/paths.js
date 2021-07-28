const electron = require('electron');
const path = require('path');

const appdata = (electron.app || electron.remote.app).getPath('userData');
const projectData = path.resolve(appdata, 'projectData.json');

module.exports = {
    projectData
}