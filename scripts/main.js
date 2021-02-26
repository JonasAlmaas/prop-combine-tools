const { app, BrowserWindow, Menu, nativeTheme } = require('electron');
const url = require('url');
const path = require('path');

// process.env.NODE_ENV = 'production';

const { mainMenuTemplate } = require('./templates');

let windowMain;

app.on('ready', function () {
    windowMain = new BrowserWindow({
        width: 1325,
        height: 800,
        minWidth: 1200,
        minHeight: 600,
        title: 'Prop Combine Tools',
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        },
    })

    windowMain.once('ready-to-show', () => {
        windowMain.show()
    })

    windowMain.setMenuBarVisibility(false);

    windowMain.loadURL(url.format({
        pathname: path.join(__dirname, '../pages/home.html'),
        protocol: 'file:',
        slashes: true
    }));

    windowMain.on('closed', function () {
        app.quit();
    })

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
})
