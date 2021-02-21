const { ipcRenderer } = require('electron');

const btnCancel = document.getElementById('cancel');

btnCancel.addEventListener('click', (e) => {
    ipcRenderer.send('manageGames:close');
})