const htmlGen = require('./scripts/utils/htmlGen.js');
const paths = require('./scripts/utils/paths.js');

const body = document.getElementsByTagName('body')[0];

export function LoadPage() {
    console.log(paths.projectData);
    console.log(paths.userData);

    var styleSheet = htmlGen.CreateStyleSheet('./styles/pages/Projects.css')
    body.append(styleSheet);

    var pageContainer = htmlGen.CreateDiv("page-container");
    {
        var navbarContainer = htmlGen.CreateDiv("navbar-container");

        var projectsContainer = htmlGen.CreateDiv("container projects");
        {
            var title = htmlGen.CreateTitle("Projects");
            projectsContainer.appendChild(title);
        }

        var previewContainer = htmlGen.CreateDiv("container preview");
        {
            var title = htmlGen.CreateTitle("Preview");
            previewContainer.appendChild(title);
        }

        pageContainer.appendChild(navbarContainer);
        pageContainer.appendChild(projectsContainer);
        pageContainer.appendChild(previewContainer);
    }
    body.appendChild(pageContainer);
    
    // const btn_01 = CreateButton("btn-01", "Hi");

    /*
        Button Events
    */
    // btn_01.addEventListener('click', (e) => {
    //     console.log("asdas");
    // });
}