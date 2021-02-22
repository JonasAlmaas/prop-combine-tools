const { app, Menu, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const windowManager = require('./windowManager')
var { projectData } = require('./tempDataManager')

const updateMenuContent = () => {
    const gamesPath = path.join(__dirname, '../config/games.json');

    var content = [
        {type: 'separator'},
        {
            label: 'Add Game',
            click() {
                windowManager.createAddGame();
            }
        },
        {
            label: 'Manage Games',
            click() {
                windowManager.createManageGames();
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
                    console.log(projectData['settings']['activeGameId']);
                }
                },
            );
        }
    }

    mainMenuTemplate[1]['submenu'] = content;

    var mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

function setActiveGame(id) {
    projectData['settings']['activeGameId'] = id;
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

updateMenuContent();

ipcMain.on('menu:games:update', function (e) {
    updateMenuContent();
})
