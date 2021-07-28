const body = document.getElementsByTagName('body')[0];

const Projects = require('.scripts/pages/Projects.js');
// require('.scripts/utils/htmlGen.js');

export function LoadPage(pageName) {
    ClearPage();

    switch (pageName)
    {
        case "Projects": { Projects.LoadPage(); break; }
    }
}

function ClearPage() {
    // var styleSheet = CreateStyleSheet('./styles/styles.css');
    body.innerHTML = '';
    // body.appendChild(styleSheet);
}
