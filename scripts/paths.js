const electron = require('electron');
const path = require('path');

const appdata = (electron.app || electron.remote.app).getPath('userData');
const projects = path.resolve(appdata, 'projects.json')
const games = path.resolve(appdata, 'games.json')

module.exports = {
    projects,
    games
}