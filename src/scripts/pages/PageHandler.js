const body = document.getElementsByTagName('body')[0];

import * as Projects from './Projects.js';
import { CreateStyleSheet } from '../utils/htmlGen.js';

export function LoadPage(pageName) {
    ClearPage();

    switch (pageName)
    {
        case "Projects": { Projects.LoadPage(); break; }
    }
}

function ClearPage() {
    var styleSheet = CreateStyleSheet('./styles/styles.css');
    body.innerHTML = '';
    body.appendChild(styleSheet);
}
