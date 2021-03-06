const sidebar = require('../scripts/sidebar.js')
sidebar.create('guide')

const { shell } = require('electron');

const linkCrowbar = document.getElementById('link-crowbar')
const linkSourceOps = document.getElementById('link-sourceOps')
const linkVide = document.getElementById('link-vide')
const linkVdcSpc = document.getElementById('link-vdc-spc')
const linkVdcQc = document.getElementById('link-vdc-qc')
const linkVdcVbsp = document.getElementById('link-vdc-vbsp')

linkCrowbar.addEventListener('click', (e) => {
    shell.openExternal('https://developer.valvesoftware.com/wiki/Crowbar')
})
linkSourceOps.addEventListener('click', (e) => {
    shell.openExternal('https://github.com/bonjorno7/SourceOps/releases')
})
linkVide.addEventListener('click', (e) => {
    shell.openExternal('https://developer.valvesoftware.com/wiki/VIDE')
})
linkVdcSpc.addEventListener('click', (e) => {
    shell.openExternal('https://developer.valvesoftware.com/wiki/Static_Prop_Combine')
})
linkVdcQc.addEventListener('click', (e) => {
    shell.openExternal('https://developer.valvesoftware.com/wiki/QC')
})
linkVdcVbsp.addEventListener('click', (e) => {
    shell.openExternal('https://developer.valvesoftware.com/wiki/VBSP')
})