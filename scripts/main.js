const url = require('url');
const path = require('path');
const fs = require('fs');

const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');

// Keep on when building
// process.env.NODE_ENV = 'production';

let mainWindow;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        title: 'Prop Combile Tools'
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/main.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function () {
        app.quit();
    })

    updateMenuContent();
})

function createAddGameWindow() {
    addGameWindow = new BrowserWindow({
        parent: mainWindow,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        },
        width: 500,
        height: 150,
        frame: false,
    });

    addGameWindow.once('ready-to-show', () => {
        addGameWindow.show()
    })

    addGameWindow.setResizable(false);
    addGameWindow.setMenuBarVisibility(false);

    addGameWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/gameProfiles/addGame.html'),
        protocol: 'file:',
        slashes: true
    }));

    addGameWindow.on('close', function () {
        addGameWindow = null;
    })
}

function createManageGamesWindow() {
    manageGamesWindow = new BrowserWindow({
        parent: mainWindow,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        },
        width: 500,
        height: 650,
        frame: false,
    });

    manageGamesWindow.once('ready-to-show', () => {
        manageGamesWindow.show()
    })

    manageGamesWindow.setResizable(false);
    manageGamesWindow.setMenuBarVisibility(false);

    manageGamesWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/gameProfiles/managGames.html'),
        protocol: 'file:',
        slashes: true
    }));

    manageGamesWindow.on('close', function () {
        manageGamesWindow = null;
    })
}

function setActiveGame(id) {
    projectData['settings']['activeGameId'] = id;
}

function updateMenuContent() {
    const gamesPath = path.join(__dirname, '../config/games.json');

    var content = [
        {type: 'separator'},
        {
            label: 'Add Game',
            click() {
                createAddGameWindow();
            }
        },
        {
            label: 'Manage Games',
            click() {
                createManageGamesWindow();
            }
        }
    ]

    if (fs.existsSync(gamesPath)) {
        var data = fs.readFileSync(gamesPath);
        var jsonData = JSON.parse(data);

        for (var key in jsonData) {
            content.unshift(
                {
                label: jsonData[key]['name'],
                id: key,
                checked: true,
                click(menuItem) {
                    setActiveGame(menuItem['id']);
                }
                },
            );
        }
    }

    mainMenuTemplate[1]['submenu'] = content;

    var mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

ipcMain.on('addGame:close', function (e) {
    addGameWindow.close();
    updateMenuContent();
});

ipcMain.on('manageGames:close', function (e) {
    manageGamesWindow.close();
    updateMenuContent();
});

var projectData = {
    'settings': {
    }
}

var mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            { label: 'New' },
            { label: 'Open' },
            { label: 'Open Recent' },
            { type: 'separator'},
            { label: 'Save' },
            { label: 'Save As...' },
            { type: 'separator' },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' :
                    'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Games',
        submenu: []
    },
    {
        label: 'View',
        submenu: [
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen'}
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'VDC Page',
                click() {
                    shell.openExternal('https://developer.valvesoftware.com/wiki/Static_Prop_Combine');
                }
            },
            {
                label: 'Mapcore Article',
                click() {
                    shell.openExternal('https://www.mapcore.org/articles/tutorials/static-prop-combine-in-csgo-r111/');
                }
            },
            {
                label: 'SourceOps',
                click() {
                    shell.openExternal('https://github.com/bonjorno7/SourceOps');
                }
            }
        ]
    }
]

// If mac os, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' :
                    'Ctrl+I',
                click(item, fucusedWindow) {
                    fucusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}
