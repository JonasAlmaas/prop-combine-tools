const body = document.body;

const Projects = require('./Projects.js');
const { CreateStyleSheet } = require('./../utils/htmlGen.js');

const { Page } = require('./pages.js');

var LoadPage = (pageName) => {
    ResetPage();

    switch (pageName)
    {
        case Page.Projects: { Projects.LoadPage(); break; }
        default: { console.log(`Invalid page ${pageName}!`); break; }
    }
}

function ResetPage() {
    var styleSheet = CreateStyleSheet('./styles/styles.css');
    body.innerHTML = '';
    body.appendChild(styleSheet);
}

module.exports = {
    LoadPage
}