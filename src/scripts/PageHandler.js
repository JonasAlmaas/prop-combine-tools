const body = document.getElementsByTagName('body')[0];

import * as Projects from './pages/Projects.js';

export function LoadPage(pageName) {
    ClearPage();

    switch (pageName)
    {
        case "Projects": { Projects.LoadPage(); break; }
    }
}

function ClearPage() {
    body.innerHTML = '';
}
