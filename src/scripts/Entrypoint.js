const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

// process.env.NODE_ENV = 'production';

let mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
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
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    })

    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function () {
        app.quit();
    })
});
