const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let window_main;

app.on('ready', function () {
    window_main = new BrowserWindow({
        width: 1400,
        height: 800,
        title: 'Prop Combile Tools'
    });

    window_main.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/main.html'),
        protocol: 'file:',
        slashes: true
    }));

    window_main.on('closed', function () {
        app.quit();
    })
})

const createManageGames = () => {
    window_manageGames = new BrowserWindow({
        parent: window_main,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        },
        width: 500,
        height: 650,
    });

    window_manageGames.once('ready-to-show', () => {
        window_manageGames.show()
    })

    window_manageGames.setResizable(false);
    window_manageGames.setMenuBarVisibility(false);

    window_manageGames.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/gameProfiles/managGames.html'),
        protocol: 'file:',
        slashes: true
    }));

    window_manageGames.on('close', function () {
        window_manageGames = null;
    })
}

const createAddGame = () => {
    window_addGame = new BrowserWindow({
        parent: window_main,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        },
        width: 500,
        height: 150,
        frame: false,
    });

    window_addGame.once('ready-to-show', () => {
        window_addGame.show()
    })

    window_addGame.setResizable(false);
    window_addGame.setMenuBarVisibility(false);

    window_addGame.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/gameProfiles/addGame.html'),
        protocol: 'file:',
        slashes: true
    }));

    window_addGame.on('close', function () {
        window_addGame = null;
    })
}

const createEditGame = () => {
    window_editGame = new BrowserWindow({
        parent: window_main,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        },
        width: 500,
        height: 150,
        frame: false,
    });

    window_editGame.once('ready-to-show', () => {
        window_editGame.show()
    })

    window_editGame.setResizable(false);
    window_editGame.setMenuBarVisibility(false);

    window_editGame.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/gameProfiles/editGame.html'),
        protocol: 'file:',
        slashes: true
    }));

    window_editGame.on('close', function () {
        window_editGame = null;
    })
}

// Create Windows
ipcMain.on('window:addGame:create', function (e) {
    createAddGame();
})
ipcMain.on('window:editGame:create', function (e, activeGame) {
    createEditGame();
    window_editGame.once('ready-to-show', () => {
        window_editGame.webContents.send('selected:gameId', activeGame);
        // window_editGame.show()
    })
})

// Close windows
ipcMain.on('window:addGame:close', function (e) {
    window_addGame.close();
})
ipcMain.on('window:editGame:close', function (e) {
    window_editGame.close();
})
ipcMain.on('window:manageGames:close', function (e) {
    window_manageGames.close();
})

module.exports = {
    createManageGames,
    createAddGame,
}